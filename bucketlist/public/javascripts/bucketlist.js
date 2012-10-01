$(function(){ 
  
  ///
  getBucketList = function(){
    var self = this;
    $.ajax({
      url: 'list',
      type: 'GET',
      success: function(result){
        console.log(result);
        self.init(result);
      }
    });
  },
  
  createOnEnter = function(){
    var _data = {
        contents : $('#contents').val()
    };
    var self = this;
    $.ajax({
      url: '/create',
      type: "POST",
      data: _data,
      success: function(result){
        console.log(result);
        //self.addBucketItem(result);
        //self.input.val('');
      }
    });
  },
  
  //Events
  $("#contents").on('keypress', function(e) {
    if(e.keyCode != 13) return;
    createOnEnter();
    e.preventDefault();
  });
  
  init = function(result){
    var ac = $("#accordion" );
    var ac1 = ac.accordion({fillSpace:false, collapsible:true, active:false});
  },
  
  
  getBucketList();
  
  //$("#accordion" ).accordion();
 

});