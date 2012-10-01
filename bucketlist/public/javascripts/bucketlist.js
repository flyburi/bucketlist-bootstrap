$(function(){ 
  
  var accordionOpts = {
      collapsible: "true",
      active: "false",
      autoHeight: "false"
  };
  
  getBucketList = function(){
    $.getJSON('list', function(data){
      $.each(data, function(key,val){
        $("#accordion").append('<h3 id="'+val.id +'"><a id="' + val.id +'">' + val.title + '<button id="' + val.id + '"type=' + "'button'" +  'class= ' + "'delButton'" +'/>');
//        $("#accordion").append('<button type=' + "'button'" + ' class= ' + "'checkButton'" +'/></a></h3>');
        $("#accordion").append('<button type=' + "'button'" + ' class= ' + "'checkButton'" +'/>');
        $("#accordion").append('</a></h3>');
        $("#accordion").append('<div><p>' + val.contents + '</p></div>');
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
    var self = this;
    $.ajax({
      url: '/create',
      type: "POST",
      data: _data,
      success: function(result){
        $("#accordion").append('<h3 id="'+result.id +'"><a id="' + result.id +'">' + result.title + '<button id="' + result.id + '"type=' + "'button'" +  'class= ' + "'delButton'" +'/></a></h3>');
        $("#accordion").append('<div><p>' + result.contents + '</p></div>')
        .accordion('destroy').accordion(accordionOpts);
        initialize();
      }
    });
  },
  
  deleteItem = function(id){
    var self = this;
    $.ajax({
      url: '/del/' + id,
      type: "DELETE",
      success: function(result){
        $("h3").remove('#'+id);
      }
    });
    
  },
  
  //Events
  $("#contents").on('keypress', function(e) {
    if(e.keyCode != 13) return;
    createOnEnter();
    e.preventDefault();
  });
  
  getBucketList();
  
  initialize  = function(){
    $("button.delButton").button({
      icons: {
          primary: "ui-icon-circle-minus"
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
    
    $("button.checkButton").button({
      icons: {
          primary: "ui-icon-check"
      },
      text: false,
      label: ""
    });
    $("button.checkButton").click(function() {
        alert("Do you really want to check this?");
        //deleteItem(this.id);
        //return false;
    });
    $("button.checkButton").bind("click", function(e) {
        e.stopPropagation();
    });
    
  };

});