window.A4P_DEFAULT_DATA = {
  club: {
    name: 'Académie de Performances - Club Démo',
    contact: 'staff@a4p.local',
    season: '2026'
  },
  coaches: [
    {id:'coach_001', name:'Alexandre Griffet', role:'Directeur A4P'},
    {id:'coach_002', name:'Coach Staff Démo', role:'Coach référent U18'}
  ],
  teams: [
    {
      id:'u18',
      name:'U18',
      sport:'Rugby',
      category:'Compétition',
      passationLinks:{
        cmp:'modules/cmp/index.html?team=u18',
        pmp:'modules/pmp/index.html?team=u18',
        psycho:'modules/psycho/index.html?team=u18'
      },
      players:[
        {id:'u18_01', firstName:'Lucas', lastName:'Martin', position:'Centre', date:'2026-03-14', modules:{cmp:{score_global:64, dimensions:{confiance:56, regulation:44, engagement:75, stabilite:81}, profil_nom:'Mobilisation forte mais régulation fluctuante'}, pmp:{score_global:69}, psycho:{score_global:61}}},
        {id:'u18_02', firstName:'Pierre', lastName:'Dubois', position:'Arrière', date:'2026-03-14', modules:{cmp:{score_global:71, dimensions:{confiance:68, regulation:60, engagement:74, stabilite:69}, profil_nom:'Socle mental solide et mobilisable'}, pmp:{score_global:73}, psycho:{score_global:66}}},
        {id:'u18_03', firstName:'Hugo', lastName:'Bernard', position:'Demi', date:'2026-03-14', modules:{cmp:{score_global:52, dimensions:{confiance:47, regulation:39, engagement:63, stabilite:59}, profil_nom:'Potentiel engagé mais confiance fragile'}, pmp:{score_global:55}, psycho:{score_global:48}}},
        {id:'u18_04', firstName:'Tom', lastName:'Garcia', position:'Ailier', date:'2026-03-14', modules:{cmp:{score_global:43, dimensions:{confiance:38, regulation:35, engagement:49, stabilite:50}, profil_nom:'Base mentale en construction'}, pmp:{score_global:47}, psycho:{score_global:42}}},
        {id:'u18_05', firstName:'Nathan', lastName:'Moreau', position:'Pilier', date:'2026-03-14', modules:{cmp:{score_global:67, dimensions:{confiance:63, regulation:55, engagement:78, stabilite:72}, profil_nom:'Socle mental solide et mobilisable'}, pmp:{score_global:65}, psycho:{score_global:59}}}
      ]
    },
    {
      id:'u16',
      name:'U16',
      sport:'Rugby',
      category:'Formation',
      passationLinks:{
        cmp:'modules/cmp/index.html?team=u16',
        pmp:'modules/pmp/index.html?team=u16',
        psycho:'modules/psycho/index.html?team=u16'
      },
      players:[
        {id:'u16_01', firstName:'Noah', lastName:'Petit', position:'Ailier', date:'2026-03-14', modules:{cmp:{score_global:58, dimensions:{confiance:54, regulation:46, engagement:68, stabilite:64}, profil_nom:'Fonctionnement mental irrégulier'}, pmp:{score_global:60}, psycho:{score_global:57}}},
        {id:'u16_02', firstName:'Enzo', lastName:'Roux', position:'Mêlée', date:'2026-03-14', modules:{cmp:{score_global:62, dimensions:{confiance:58, regulation:50, engagement:70, stabilite:70}, profil_nom:'Fonctionnement mental irrégulier'}, pmp:{score_global:63}, psycho:{score_global:61}}},
        {id:'u16_03', firstName:'Leo', lastName:'Simon', position:'Centre', date:'2026-03-14', modules:{cmp:{score_global:74, dimensions:{confiance:72, regulation:68, engagement:76, stabilite:79}, profil_nom:'Socle mental solide et mobilisable'}, pmp:{score_global:76}, psycho:{score_global:71}}}
      ]
    }
  ]
};
