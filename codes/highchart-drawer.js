$('#container').highcharts({
  chart: {
    type: 'line',
    panning: false,
    events: {
      render: setupInterface
    }
  },
  title: {
    text: 'Draw plots with your mouse, plus resizing & moving'
  },
  xAxis: {
    type: "datetime",
    //minTickInterval:  3600*24*30*1000
  },
  series: [{
    data: [{
      x: Date.UTC(2018,4,1),
      y: 1
    }, {
      x: Date.UTC(2018,4,2),
      y: 1
    }, {
      x: Date.UTC(2018,4,3),
      y: 1
    }, {
      x: Date.UTC(2018,4,4),
      y: 2
    }, {
      x: Date.UTC(2018,4,5),
      y: 2
    }, {
      x: Date.UTC(2018,4,6),
      y: 2
    }, {
      x: Date.UTC(2018,4,7),
      y: 1
    }, {
      x: Date.UTC(2018,4,8),
      y: 1
    }, {
      x: Date.UTC(2018,4,9),
      y: 1
    }, {
      x: Date.UTC(2018,4,10),
      y: 2
    }, {
      x: Date.UTC(2018,4,11),
      y: 2
    }, {
      x: Date.UTC(2018,4,12),
      y: 2
    }]
  }]
});

var drag_started = false;
var cursor_id = 0;
var drag_range = {start:0, end:0};
var active_plotobj = null;
var clickX = 0;
var originOutlines = {start: 0, end: 0};
var _cursor_id = 0;
var _map_cursor__tag = {};
var _clickDelay = 300, _cancelClick, _clickIsValid;
var _edgeWidth = 3;
var _dontClick = function(){
  _clickIsValid = false;
}

function inRect (position, rect) {
  if ((position.x < rect.x) || (position.x > rect.x+rect.width))
    return false;
  if ((position.y < rect.y) || (position.y > rect.y+rect.height))
    return false;

  return true;
}
      
function getPlotObjInfo(raw_str){
  var arr_parts = raw_str.split("_");
  return {type: arr_parts[0], id: arr_parts[1]};
}

function getPlotObjById(id){
  for (var i=0; i< window._chart.xAxis[0].plotLinesAndBands.length; i++){
    if (window._chart.xAxis[0].plotLinesAndBands[i].id == id) {
      return window._chart.xAxis[0].plotLinesAndBands[i];
    }
  }
}

function addPlotObjListener(obj, info){
  switch (info.type){
    case 'start':
      if (obj.svgElem == undefined)
        break;

      obj.svgElem.css({
        'cursor': 'ew-resize'
      })
      .attr('id', info.type+'_'+info.id)
      .translate(0,0)
      .on('mousedown', startLineSt);
      break;
    case 'end':
      if (obj.svgElem == undefined)
        break;

      obj.svgElem.css({
        'cursor': 'ew-resize'
      })
      .attr('id', info.type+'_'+info.id)
      .translate(0,0)
      .on('mousedown', startLineEn);
      break;
    case 'band':
      if (obj.svgElem == undefined)
        console.log("Duration is too short.");
      else
        obj.svgElem.css({
          'cursor': 'move'
        })
        .attr('id', info.type+'_'+info.id)
        .translate(0,0)
        .on('mousedown', startBand);
      
      break;
    default:
      break;
  }        
}

/* Event processors for drag/redraw */
function startBand(e){
  e.stopPropagation();

  console.log("Element id", e.srcElement.id)
  active_plotobj = getPlotObjById(e.srcElement.id).svgElem;

  _clickIsValid = true;
  _cancelClick = setTimeout(_dontClick, _clickDelay);

  $(document).bind({
    'mousemove.active_plotobj' : stepBand,
    'mouseup.active_plotobj' : endDragBand
  });
  var info = getPlotObjInfo(active_plotobj.attr('id'));

  var objLineSt = getPlotObjById('start_' + info.id);
  var objLineEn = getPlotObjById('end_' + info.id);

  originOutlines.start = objLineSt.options.value;
  originOutlines.end = objLineEn.options.value;

  clickX = e.pageX - active_plotobj.translateX;        
}

function startLineEn(e){
  e.stopPropagation();

  console.log("Element id", e.srcElement.id)
  active_plotobj = getPlotObjById(e.srcElement.id).svgElem;
  
  _clickIsValid = true;
  _cancelClick = setTimeout(_dontClick, _clickDelay);

  $(document).bind({
    'mousemove.active_plotobj' : stepLineEn,
    'mouseup.active_plotobj' : endDragLine
  });
  clickX = e.pageX - active_plotobj.translateX;        
}

function startLineSt(e){
  e.stopPropagation();

  active_plotobj = getPlotObjById(e.srcElement.id).svgElem;
  
  _clickIsValid = true;
  _cancelClick = setTimeout(_dontClick, _clickDelay);

  $(document).bind({
    'mousemove.active_plotobj' : stepLineSt,
    'mouseup.active_plotobj' : endDragLine
  });
  clickX = e.pageX - active_plotobj.translateX;        
}

function endDragBand(e){
  $(document).unbind('.active_plotobj');
  var id = active_plotobj.attr('id');
  var info = getPlotObjInfo(id);

  if (_cancelClick != null) clearTimeout(_cancelClick);
  if (_clickIsValid) {
    _rollbackRange(info.id);
    openDeleteMenu(info.id, e);
    return;
  }
  
  
  var objLineSt = getPlotObjById('start_' + info.id);
  var objLineEn = getPlotObjById('end_' + info.id);

  window._chart.xAxis[0].removePlotBand(id);

  var startX = Math.min(objLineSt.options.value, objLineEn.options.value);
  var endX = Math.max(objLineSt.options.value, objLineEn.options.value);

  var obj_band = window._chart.xAxis[0].addPlotBand({
    from: startX,
    to: endX,
    color: 'green',
    id: id
  });

  addPlotObjListener(obj_band, info);
  addPlotObjListener(objLineSt, {type: 'start', id: info.id});
  addPlotObjListener(objLineEn, {type: 'end', id: info.id});        

  e.stopPropagation();
}
function endDragLine(e){
  $(document).unbind('.active_plotobj');
  var point_x = active_plotobj.attr('value');
  var id = active_plotobj.attr('id');
  var info = getPlotObjInfo(id);
  var type = info.type;

  if (_cancelClick != null) clearTimeout(_cancelClick);
  if (_clickIsValid) {
    _rollbackRange(info.id);
    openDeleteMenu(info.id, e);
    return;
  }

  var objLine = getPlotObjById(id);
  var objBody =  getPlotObjById('band_' + info.id);
  
  var new_val = point_x + objLine.options.value - window._chart.xAxis[0].toValue(0,1);
  window._chart.xAxis[0].removePlotLine(id);

  var obj_line = window._chart.xAxis[0].addPlotLine({
    value: new_val,
    width: _edgeWidth,
    color: 'green',
    id: id,
    zIndex: 2
  });

  addPlotObjListener(objBody, {type: 'band', id: info.id});
  addPlotObjListener(obj_line, {type: type, id: info.id});

  e.stopPropagation();
}
function stepBand(e){
  var info = getPlotObjInfo(active_plotobj.attr('id'));
  var newPos = active_plotobj.translate(e.pageX - clickX, false);
  var point_x = window._chart.xAxis[0].toValue(newPos.translateX, 1);

  var objBody =  getPlotObjById('band_' + info.id);

  /*active_plotobj = objBody.svgElem.attr({
    from: point_x
  });*/

  var startLineValue = originOutlines.start + point_x - window._chart.xAxis[0].toValue(0,1);
  var endLineValue = originOutlines.end + point_x - window._chart.xAxis[0].toValue(0,1);

  window._chart.xAxis[0].removePlotLine('start_' + info.id);
  window._chart.xAxis[0].removePlotLine('end_' + info.id);

  window._chart.xAxis[0].addPlotLine({
    value: startLineValue,
    width: _edgeWidth,
    color: 'green',
    id: 'start_'+info.id,
    zIndex: 2
  });
  window._chart.xAxis[0].addPlotLine({
    value: endLineValue,
    width: _edgeWidth,
    color: 'green',
    id: 'end_'+info.id,
    zIndex: 2
  });

  e.stopPropagation();
}
function stepLineSt(e){
  var info = getPlotObjInfo(active_plotobj.attr('id'));
  var newPos = active_plotobj.translate(e.pageX - clickX, false);

  var objLineSt = getPlotObjById('start_' + info.id);
  //var objBody = 'band_' + getPlotObjById(id);
  var objLineEn = getPlotObjById('end_' + info.id);

  var endLineValue = objLineEn.options.value;
  var point_x = window._chart.xAxis[0].toValue(newPos.translateX, 1);

  active_plotobj = objLineSt.svgElem.attr({
    value: point_x
  });
  window._chart.xAxis[0].removePlotBand('band_' + info.id);

  var startLineValue = point_x + objLineSt.options.value - window._chart.xAxis[0].toValue(0,1);

  var startLineValue_final = Math.min(startLineValue, endLineValue);
  var endLineValue_final = Math.max(startLineValue, endLineValue);

  window._chart.xAxis[0].addPlotBand({
    from: startLineValue_final,
    to: endLineValue_final,
    color: 'green',
    id: 'band_'+info.id
  });
  //objLineSt.options.value = startLineValue;
  e.stopPropagation();
}
function stepLineEn(e){
  var info = getPlotObjInfo(active_plotobj.attr('id'));
  var newPos = active_plotobj.translate(e.pageX - clickX, false);

  var objLineSt = getPlotObjById('start_' + info.id);
  //var objBody = 'band_' + getPlotObjById(id);
  var objLineEn = getPlotObjById('end_' + info.id);

  var startLineValue = objLineSt.options.value;
  var point_x = window._chart.xAxis[0].toValue(newPos.translateX, 1);

  active_plotobj = objLineEn.svgElem.attr({
    value: point_x
  });
  window._chart.xAxis[0].removePlotBand('band_' + info.id);

  var endLineValue = point_x + objLineEn.options.value - window._chart.xAxis[0].toValue(0,1);
  
  var startLineValue_final = Math.min(startLineValue, endLineValue);
  var endLineValue_final = Math.max(startLineValue, endLineValue);

  window._chart.xAxis[0].addPlotBand({
    from: startLineValue_final,
    to: endLineValue_final,
    color: 'green',
    id: 'band_'+info.id
  });
  //objLineEn.options.value = endLineValue;

  e.stopPropagation();
}

function setupInterface (event) {
  // Highcharts object
  var chart = event.target;
  window._chart = chart;

  // Get drawable area (element)
  var target = $(chart.container).find('g.highcharts-grid:eq(1)');
  target.attr('id', 'ss-mouse-target');
  var g_box = document.getElementById('ss-mouse-target').getBBox();
  
  $(chart.container).mousedown((event) => {
    if (!inRect({x: event.offsetX, y: event.offsetY}, g_box)) {
      // Only listen to events on drawable area
      return;
    }
  
    _clickIsValid = true;
    _cancelClick = setTimeout(_dontClick, _clickDelay);
    
    drag_range.start = event.offsetX-g_box.x;
    drag_started = true;

    var frame_range = chart.xAxis[0].getExtremes();
    var frame_start_moment = frame_range.min;
    var frame_end_moment = frame_range.max;           
    var frame_length = frame_end_moment - frame_start_moment;
    var totalWidth = g_box.width;
    var selection_start_moment = frame_start_moment + drag_range.start/totalWidth*(frame_length);
    chart.xAxis[0].addPlotBand({
      from: selection_start_moment,
      to: selection_start_moment+100,
      color: 'green',
      id: 'band_temp'       
    });
  });
  
  $(chart.container).mousemove((event) => {
    if (!drag_started)
              return;

    var drag_offset_now = event.offsetX-g_box.x;
    var frame_range = chart.xAxis[0].getExtremes();
    var frame_start_moment = frame_range.min;
    var frame_end_moment = frame_range.max;           
    var frame_length = frame_end_moment - frame_start_moment;
    var totalWidth = g_box.width;
    var selection_start_moment = frame_start_moment + drag_range.start/totalWidth*(frame_length);
    var selection_end_moment = frame_start_moment + drag_offset_now/totalWidth*(frame_length);
    chart.xAxis[0].removePlotBand('band_temp');

    var selection_start_moment_final = Math.min(selection_start_moment, selection_end_moment);
    var selection_end_moment_final = Math.max(selection_start_moment, selection_end_moment);

    chart.xAxis[0].addPlotBand({
      from: selection_start_moment_final,
      to: selection_end_moment_final,
      color: 'green',
      id: 'band_temp'         
    });
  });
  
  $(chart.container).mouseup((event) => {
    chart.xAxis[0].removePlotBand('band_temp');

    if (_cancelClick != null) clearTimeout(_cancelClick);

    if (!inRect({x: event.offsetX, y: event.offsetY}, g_box)){
      drag_started = false;
      return;
    }

    if (!drag_started) return;            

    if (_clickIsValid) {
      drag_started = false;
      drag_range.start = 0;
      return;
    }

    drag_range.end = event.offsetX-g_box.x;
    drag_started = false;

    var frame_range = chart.xAxis[0].getExtremes();

    var frame_start_moment = frame_range.min;
    var frame_end_moment = frame_range.max;

    var frame_length = frame_end_moment - frame_start_moment;

    var totalWidth = g_box.width;
    var selection_start_moment = frame_start_moment + drag_range.start/totalWidth*(frame_length);
    var selection_end_moment = frame_start_moment + drag_range.end/totalWidth*(frame_length);

    var startX = Math.round(Math.min(selection_start_moment, selection_end_moment));
    var endX = Math.round(Math.max(selection_start_moment, selection_end_moment));

    _drawRange(startX, endX, 'green');
    _cursor_id ++;
  });
  
  _drawRange = function(startX, endX, color, cursor_id){
    // if cursor_id == null it is new range, if not it is existing
    var c_id;
    if (cursor_id == null)
      c_id = _cursor_id;
    else
      c_id = cursor_id;

    var startX_final = Math.min(startX, endX);
    var endX_final = Math.max(startX, endX);

    //console.log(startX_final + " : " + endX_final + " - " + color + " #" + c_id);
    if (startX_final == endX_final) return;

    var obj_line_start = chart.xAxis[0].addPlotLine({
      value: startX_final-_edgeWidth,
      width: _edgeWidth,
      color: color,
      id: 'start_'+c_id,
      zIndex: 2
    });
    var obj_line_end = chart.xAxis[0].addPlotLine({
      value: endX_final,
      width: _edgeWidth,
      color: color,
      id: 'end_'+c_id,
      zIndex: 2
    });
    var obj_band = chart.xAxis[0].addPlotBand({
      from: startX_final,
      to: endX_final,
      color: color,
      id: 'band_'+c_id          
    });
    
    addPlotObjListener(obj_band, {type: 'band', id: c_id});
    addPlotObjListener(obj_line_start, {type: 'start', id: c_id});
    addPlotObjListener(obj_line_end, {type: 'end', id: c_id});
  }
}
