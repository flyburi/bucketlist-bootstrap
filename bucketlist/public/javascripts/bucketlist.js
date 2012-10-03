$(function(){ 
  
  var accordionOpts = {
      collapsible: "true",
      active: "false",
      autoHeight: "false"
  };
  
  getBucketList = function(){
    $.getJSON('list', function(data){
      $.each(data, function(key,val){
        //TODO Refactoring UI or extract Method
        $("#accordion").append('<h3 id="'+val.id +'"><a>' + val.title + '<button id="' + val.id + '"type=' + "'button'" +  'class= ' + "'delButton'" +' /><button id="' + val.id + '"type=' + "'button'" +  'class= ' + "'editButton'" +' /><button id="' + val.id + '"type=' + "'button'" +  'class= ' + "'checkButton'" +' />');
        $("#accordion").append('</a></h3>');
        $("#accordion").append('<div contenteditable="true" id="'+val.id + '" class= ' + "'contentDiv'"+'><p>' + val.contents + '</p></div>');
      });
      
      $("#accordion" ).accordion(accordionOpts);
      initialize();
    });
  },
  
  createOnEnter = function(){
    var _data = {
        title : $('#title').val(),
        contents : $('#contents').val()
    };
    
    $.ajax({
      url: '/create',
      type: "POST",
      data: _data
    }).done(function(result){
      //TODO Refactoring UI or extract Method
      $("#accordion").append('<h3 id="'+result.id +'"><a>' + result.title + '<button id="' + result.id + '"type=' + "'button'" +  'class= ' + "'delButton'" +'/><button id="' + result.id + '"type=' + "'button'" +  'class= ' + "'editButton'" +' /><button id="' + result.id + '"type=' + "'button'" +  'class= ' + "'checkButton'" +' />');
      $("#accordion").append('</a></h3>');
      $("#accordion").append('<div contenteditable="true" id="'+result.id+'" class= ' + "'contentDiv'"+'><p>' + result.contents + '</p></div>');
      
      $("#accordion").accordion('destroy').accordion(accordionOpts);
      initialize();
    });
  },
  
  deleteItem = function(id){
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
    //Initial Input and Textarea
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
  };
});