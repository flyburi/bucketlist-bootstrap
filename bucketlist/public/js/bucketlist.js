$(function(){
  
  var bucketListHolder = $('#bucketList');
  
  bucketListHolder.on('change', 'li input[type=checkbox]',function(e){
      var checkbox = $(this),
      li = checkbox.closest('li');
      li.toggleClass('done',checkbox.is(':checked'));
      if(checkbox.is(':checked')){
        toggleDoneItem('true', li.get(0).id);
      }
      else{
        toggleDoneItem('false', li.get(0).id);
      }
  }); 
  
  bucketListHolder.on('click', 'li .delete',function(e){
    var li = $(this).closest('li');
      li.fadeOut(function(){
      li.remove();
    });
    if(li.data('id') != 0){
      deleteItem(li.get(0).id);
    }
  });
  
  bucketListHolder.on('dblclick', 'li',function(e){
    var checkbox = $(this),
    li = checkbox.closest('li');
    if(li.children('p').hasClass('hiddenDiv')){
      li.children('p').removeClass('hiddenDiv');
    }else{
      li.children('p').addClass('hiddenDiv');
    }
  });

  
  
  var accordionOpts = {
      collapsible: "true",
      active: "false",
      autoHeight: "true"
  };
  
  signup = function(){
    //show signup div
    var _data = {
        email: $('#email').val(),
        password: $('#password').val()
    };
    $.ajax({
      url:'/signup',
      type: 'POST',
      data: _data
    }).done(function(result){
      //TODO manage session : email
      alert('signup success');
      $('#loginForm').hide();
      $('#profileDiv').append(result.email +" 님");
    }).fail(function(result){
      alert('fail..: '+result);
    });
  },
  
  signin = function(){
    var _data = {
        email: $('#email').val(),
        password: $('#password').val()
    };
    $.ajax({
      url: '/signin',
      type: "POST",
      data: _data
    }).done(function(result){
      //TODO manage session : email
      alert("singin success!! result : " + result.email);
      $('#loginForm').hide();
      $('#profileDiv').append(result.email +" 님");
    }).fail(function(result){
      alert('signin fail....');
    });
  },
  
  getBucketList = function(){
    $.getJSON('list', function(data){
      $.each(data, function(key,val){
        var item;
        if(val.done){
          item = $('<li id="'+val.id+'" class="done">'+
              '<input type="checkbox" checked/>'+val.title+
              '<a href="#" class="delete">✖</a>'+
              '<p class="hiddenDiv">'+val.contents+'</p>' +
              '</li>');
        }else{
//        console.log("done : " +val.done);
          var item = $('<li id="'+val.id+'">'+
            '<input type="checkbox" />'+val.title+
            '<a href="#" class="delete">✖</a>'+
            '<p class="hiddenDiv">'+val.contents+'</p>' +
            '</li>');
        }
        $("#todos").append(item);
      });
    });
  },
  
  createOnEnter = function(){
    var _data = {
        title : $('#title').val(),
        contents : $('#contents').val(),
        tags : $('#tag').val(),
        checkPrivate : $('#checkPrivate').val()
    };
    $.ajax({
      url: '/create',
      type: "POST",
      data: _data
    }).done(function(result){
      reset();
      getBucketList();
    });
  },
  
  reset = function(){
    clearBucketList();
    resetInputValue();
  },
  
  clearBucketList = function(){
    $("#todos").empty();
  },
  
  resetInputValue = function(){
    $('#title').val('');
    $('#contents').val('');
    $('#tag').val('');
    $('#checkPrivate').val('');
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

  toggleDoneItem = function(done, id){
    var _data = {
        done: done
    };
    
    $.ajax({
      url: '/update/' + id,
      type: "PUT",
      data: _data
    }).done(function(result){
      alert(result);
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
  $("#signupBtn").on('click', function(e){
    signup();
    e.preventDefault();
  });
  
  $("#signinBtn").on('click', function(e){
    signin();
    e.preventDefault();
  });
  
  $("#createBtn").on('click', function(e){
    createOnEnter();
    e.preventDefault();
  });
  
  $("#listLink").on('click', function(e){
    getBucketList();
  });
  
  
  initialize  = function(){
    getBucketList();

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

$(document).ready(function() { 
  initialize();
});