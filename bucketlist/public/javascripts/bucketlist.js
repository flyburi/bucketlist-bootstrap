$(function(){ 
  
  var accordionOpts = {
      collapsible: "true",
      active: "false",
      autoHeight: "false"
  };
  
  getBucketList = function(){
    $.getJSON('list', function(data){
      $.each(data, function(key,val){
//        ui(val);
        $("#accordion").append('<h3 id="'+val.id +'"><a id="' + val.id +'">' + val.title + '<button id="' + val.id + '"type=' + "'button'" +  'class= ' + "'delButton'" +' /><button id="' + val.id + '"type=' + "'button'" +  'class= ' + "'editButton'" +' /><button id="' + val.id + '"type=' + "'button'" +  'class= ' + "'checkButton'" +' />');
        $("#accordion").append('</a></h3>');
        $("#accordion").append('<div contenteditable="true" id="'+val.id + '" class= ' + "'contentDiv'"+'><p>' + val.contents + '</p></div>');
      });
      $("#accordion" ).accordion(accordionOpts);
      initialize();
    });
  },

  /*
  ui = function(result){
    $("#accordion").append('<h3 id="'+result.id +'"><a id="' + result.id +'">' + result.title + '<button id="' + result.id + '"type=' + "'button'" +  'class= ' + "'delButton'" +'/></a></h3>');
    $("#accordion").append('<div contenteditable="true" id="'+result.id+'" class= ' + "'contentDiv'"+'><div><button type=' + "'button'" + ' class= ' + "'checkButton'" +'>menu</button></div><p>' + result.contents + '</p></div>')
  },
  */
  
  createOnEnter = function(){
    var _data = {
        title : $('#title').val(),
        contents : $('#contents').val()
    };
    var self = this;
    $.ajax({
      url: '/create',
      type: "POST",
      data: _data
    }).done(function(result){
//    ui(result);
      $("#accordion").append('<h3 id="'+result.id +'"><a id="' + result.id +'">' + result.title + '<button id="' + result.id + '"type=' + "'button'" +  'class= ' + "'delButton'" +'/><button id="' + result.id + '"type=' + "'button'" +  'class= ' + "'editButton'" +' /><button id="' + result.id + '"type=' + "'button'" +  'class= ' + "'checkButton'" +' />');
      $("#accordion").append('</a></h3>');
      $("#accordion").append('<div contenteditable="true" id="'+result.id+'" class= ' + "'contentDiv'"+'><p>' + result.contents + '</p></div>');
      $("#accordion").accordion('destroy').accordion(accordionOpts);
      initialize();
    });
  },
  
  deleteItem = function(id){
    var self = this;
    $.ajax({
      url: '/del/' + id,
      type: "DELETE"
    }).done(function(result){
        $("h3").remove('#'+id);
        $("div").remove('#'+id);
    });
  },
  
  updateItem = function(id){
    var contents = $('div#'+id+' p').text();
    var _data = {
        contents: contents,
        done: true
    };
    $.ajax({
      url: '/update/' + id,
      type: "PUT",
      data: _data
    }).done(function(result){
    });
  },
  
  //Events
  $("#createBtn").on('click', function(e){
    createOnEnter();
    e.preventDefault();
  });
  
  getBucketList();
  
  initialize  = function(){
    
    $('#title').val(""),
    $('#contents').val(""),
    
    $("button.delButton").button({
      icons: {
          primary: "ui-icon-trash"
      },
      text: false,
      label: ""
    });
    $("button.delButton").click(function() {
        alert("Do you really want to delete this?");
        deleteItem(this.id);
        return false;
    });
    $("button.delButton").bind("click", function(e) {
        e.stopPropagation();
    });
    
    
    $("button.editButton").button({
      icons: {
          primary: "ui-icon-pencil"
      },
      text: false,
      label: ""
    });
    $("button.editButton").click(function() {
        alert("Do you really want to update this?");
        updateItem(this.id);
//        return false;
    });
    $("button.editButton").bind("click", function(e) {
        e.stopPropagation();
    });
    
    
    
    
    $("button.checkButton").button({
      icons: {
          primary: "ui-icon-check"
      },
      text: false,
      label: ""
    });
    $("button.checkButton").click(function() {
        alert("Are you sure you done this?");
        updateItem(this.id);
    });
    $("button.checkButton").bind("click", function(e) {
        e.stopPropagation();
    });
    
    
    $("div.contentDiv").dblclick(function() {
      alert("div click");
    });
    $("div.contentDiv").bind("dblclick", function(e) {
        e.stopPropagation();
    });
    
  };
});