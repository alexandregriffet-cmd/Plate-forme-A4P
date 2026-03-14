(function(){
  function deepClone(obj){ return JSON.parse(JSON.stringify(obj)); }

  function loadData(){
    const key = window.A4P_CONFIG.storageKey;
    try {
      const raw = localStorage.getItem(key);
      if(raw){ return JSON.parse(raw); }
    } catch(e){}
    const seeded = deepClone(window.A4P_DEFAULT_DATA);
    saveData(seeded);
    return seeded;
  }

  function saveData(data){
    localStorage.setItem(window.A4P_CONFIG.storageKey, JSON.stringify(data));
  }

  function getAllPlayers(data){
    return (data.teams || []).flatMap(team => (team.players || []).map(player => ({...player, teamId:team.id, teamName:team.name, sport:team.sport} )));
  }

  function avg(values){
    const arr = values.filter(v => typeof v === 'number' && !Number.isNaN(v));
    return arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length) : 0;
  }

  function computeTeamStats(team){
    const players = team.players || [];
    const cmpScores = players.map(p => p.modules?.cmp?.score_global || 0);
    const pmpScores = players.map(p => p.modules?.pmp?.score_global || 0);
    const psychoScores = players.map(p => p.modules?.psycho?.score_global || 0);

    const confidence = avg(players.map(p=>p.modules?.cmp?.dimensions?.confiance || 0));
    const regulation = avg(players.map(p=>p.modules?.cmp?.dimensions?.regulation || 0));
    const engagement = avg(players.map(p=>p.modules?.cmp?.dimensions?.engagement || 0));
    const stabilite = avg(players.map(p=>p.modules?.cmp?.dimensions?.stabilite || 0));

    const cmpAvg = avg(cmpScores);
    const pmpAvg = avg(pmpScores);
    const psychoAvg = avg(psychoScores);
    const mentalGlobal = avg([cmpAvg, pmpAvg, psychoAvg]);

    const alerts = players.map(player => ({player, level:getAlertLevel(player.modules?.cmp)})).filter(item => item.level !== 'green');

    const profileCount = {};
    players.forEach(player => {
      const name = player.modules?.cmp?.profil_nom || 'Non défini';
      profileCount[name] = (profileCount[name] || 0) + 1;
    });
    const dominantProfile = Object.entries(profileCount).sort((a,b)=>b[1]-a[1])[0]?.[0] || 'Non défini';

    return {
      playersCount: players.length,
      cmpAvg,pmpAvg,psychoAvg,mentalGlobal,
      dimensions:{confiance:confidence, regulation, engagement, stabilite},
      alertsCount: alerts.length,
      dominantProfile,
      alerts,
      profileCount
    };
  }

  function getAlertLevel(cmp){
    if(!cmp) return 'orange';
    const d = cmp.dimensions || {};
    const lowDims = [d.confiance,d.regulation,d.engagement,d.stabilite].filter(v=>typeof v==='number' && v < 40).length;
    if((cmp.score_global || 0) < 45 || lowDims >= 2) return 'red';
    if((cmp.score_global || 0) < 55 || [d.confiance,d.regulation,d.engagement,d.stabilite].some(v=>typeof v==='number' && v < 45)) return 'orange';
    return 'green';
  }

  function badgeClass(level){
    return level === 'red' ? 'alert-red' : level === 'orange' ? 'alert-orange' : 'alert-green';
  }

  function badgeLabel(level){
    return level === 'red' ? 'Alerte rouge' : level === 'orange' ? 'Vigilance' : 'Stable';
  }

  function qs(name){ return new URLSearchParams(window.location.search).get(name); }

  function uid(prefix='id'){ return prefix + '_' + Math.random().toString(36).slice(2,9); }

  function upsertClub(payload){
    const data = loadData();
    data.club = {...data.club, ...payload};
    saveData(data);
    return data;
  }

  function addCoach(payload){
    const data = loadData();
    data.coaches = data.coaches || [];
    data.coaches.push({id:uid('coach'), ...payload});
    saveData(data);
    return data;
  }

  function addTeam(payload){
    const data = loadData();
    data.teams = data.teams || [];
    const id = payload.id || uid('team');
    data.teams.push({
      id,
      name: payload.name,
      sport: payload.sport,
      category: payload.category,
      passationLinks: {
        cmp: `modules/cmp/index.html?team=${id}`,
        pmp: `modules/pmp/index.html?team=${id}`,
        psycho: `modules/psycho/index.html?team=${id}`
      },
      players: []
    });
    saveData(data);
    return id;
  }

  function addPlayer(teamId, payload){
    const data = loadData();
    const team = data.teams.find(t=>t.id===teamId);
    if(!team) return false;
    team.players.push({
      id: uid('player'),
      firstName: payload.firstName,
      lastName: payload.lastName,
      position: payload.position || '',
      date: payload.date || new Date().toISOString().slice(0,10),
      modules: payload.modules || {
        cmp:{score_global:0, dimensions:{confiance:0, regulation:0, engagement:0, stabilite:0}, profil_nom:'Non évalué'},
        pmp:{score_global:0},
        psycho:{score_global:0}
      }
    });
    saveData(data);
    return true;
  }

  function getTeamById(id){ const data = loadData(); return data.teams.find(t=>t.id===id); }
  function getPlayerById(id){ return getAllPlayers(loadData()).find(p=>p.id===id); }

  function syncIntoLegacyHub(){
    const data = loadData();
    const allPlayers = getAllPlayers(data);
    const cmpAvg = avg(allPlayers.map(p=>p.modules?.cmp?.score_global || 0));
    const pmpAvg = avg(allPlayers.map(p=>p.modules?.pmp?.score_global || 0));
    const psychoAvg = avg(allPlayers.map(p=>p.modules?.psycho?.score_global || 0));
    const mentalGlobal = avg([cmpAvg,pmpAvg,psychoAvg]);
    localStorage.setItem('a4p_hub_results', JSON.stringify({
      CMP:{score_global:cmpAvg, summary:'Moyenne CMP club synchronisée depuis la plateforme A4P V4.'},
      PMP:{score_global:pmpAvg, summary:'Moyenne PMP club synchronisée depuis la plateforme A4P V4.'},
      PSYCHO:{score_global:psychoAvg, summary:'Moyenne psycho-émotionnelle club synchronisée depuis la plateforme A4P V4.'},
      GLOBAL:{score_global:mentalGlobal, updated_at:new Date().toISOString()}
    }));
  }

  window.A4P = { loadData, saveData, getAllPlayers, computeTeamStats, getAlertLevel, badgeClass, badgeLabel, qs, uid, upsertClub, addCoach, addTeam, addPlayer, getTeamById, getPlayerById, syncIntoLegacyHub, avg };
})();
