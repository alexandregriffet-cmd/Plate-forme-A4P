window.A4PCharts = {
  radar(el, labels, data, label='Score'){
    if(!window.Chart || !el) return;
    return new Chart(el, {
      type:'radar',
      data:{ labels, datasets:[{ label, data, fill:true, backgroundColor:'rgba(30,95,151,.18)', borderColor:'#1e5f97', pointBackgroundColor:'#123f6b', borderWidth:2 }] },
      options:{ responsive:true, maintainAspectRatio:false, scales:{ r:{ min:0, max:100, ticks:{ stepSize:20 }, angleLines:{ color:'#d5e2ef' }, grid:{ color:'#d5e2ef' }, pointLabels:{ color:'#27415e', font:{ size:12, weight:'600' }}}}, plugins:{ legend:{ display:false }}}
    });
  },
  bar(el, labels, data, label='Score moyen'){
    if(!window.Chart || !el) return;
    return new Chart(el, {
      type:'bar',
      data:{ labels, datasets:[{ label, data, backgroundColor:['#123f6b','#3b82c4','#6ca7dd','#93bee5'] }] },
      options:{ responsive:true, maintainAspectRatio:false, scales:{ y:{ min:0,max:100,ticks:{ stepSize:20 } } }, plugins:{ legend:{ display:false } } }
    });
  },
  line(el, labels, data, label='Évolution'){
    if(!window.Chart || !el) return;
    return new Chart(el, {
      type:'line',
      data:{ labels, datasets:[{ label, data, fill:false, borderColor:'#123f6b', tension:.25 }] },
      options:{ responsive:true, maintainAspectRatio:false, scales:{ y:{ min:0,max:100,ticks:{ stepSize:20 } } } }
    });
  },
  doughnut(el, labels, data){
    if(!window.Chart || !el) return;
    return new Chart(el, {
      type:'doughnut',
      data:{ labels, datasets:[{ data, backgroundColor:['#123f6b','#3b82c4','#6ca7dd','#93bee5','#dce8f6'] }] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom' } } }
    });
  }
};
