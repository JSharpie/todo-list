var page = {
  delete: function(){

  },
  init: function(){
    $('.itemsLeft').html(todoData.length - page.checkCount() + " items left");
    page.stylesInit();
    page.eventsInit();
  },
  stylesInit: function(){
    page.loadItemTemplate($('.items'), todoData, $('#todoListTemplate').html());
    page.checkComplete();
  },
  eventsInit: function(){
    $('form').on('submit', function(event){
      event.preventDefault();
      if($('input[name="newToDo"]').val() === ""){
        return;
      }
      if($('input[name="newToDo"]').val()[0] === " "){
        return;
      }
      var newToDo = {
        todoItem: $('input[name="newToDo"]').val(),
        isChecked: false
      };
      //thanks to my buddy Maddog for helping me figure out how to prevent duplicates. http://steamcommunity.com/id/MaddogSuperior/
      var found = false;
      for(var i=0; i< todoData.length; i++) {
        if(todoData[i].todoItem == newToDo.todoItem) {
          found = true;
          break;
        }
      }
      if(!found) {
        todoData.push(newToDo);
      }
      $('input[name="newToDo"]').val("");
      $('.itemsLeft').html(todoData.length - page.checkCount() + " items left");
      $('.items').html('');
      page.stylesInit();
    });
    $('div').on('click', '.check', function(event){
      $(this).toggleClass('checked');
      $(this).siblings().toggleClass('crossed');
      page.checkedIt();
      $('.itemsLeft').html(todoData.length - page.checkCount() + " items left");
    });
    //Gotta love my boy David Thomas for his tip on http://stackoverflow.com/questions/8548126/make-span-element-editable
    $('div').on('dblclick', '.todoListItem', function(event){
       $(this).attr('contentEditable', true);
       console.log(this);
       $(this).on('keydown', function(event){
         if(event.keyCode === 13){
           $(this).attr('contentEditable', false);
           for(var i = 0; i < todoData.length; i++){
             todoData[i].todoItem = $('.todoListItem:eq(' + i + ')').text();
          }
         }
         if($('.todoListItem').text() === ""){
           $(this).parent().remove();
           for(var j = todoData.length - 1; j>=0; j--) {
             if(todoData[j].todoItem === "") {
               todoData.splice(j, 1);
             }
           }
           $('.itemsLeft').html(todoData.length - page.checkCount() + " items left");
         }
       });
        for(var i = 0; i < todoData.length; i++){
          todoData[i].todoItem = $('.todoListItem:eq(' + i + ')').text();
       }
     });
    $('ul').on('click', '.clearComplete', function(event){
      console.log(this);
      for(var i = todoData.length - 1; i>=0; i--) {
        if(todoData[i].isChecked === true) {
          todoData.splice(i, 1);
        }
      }
      //$('.itemsLeft').html(todoData.length - page.checkCount() + " items left");
      $('.items').html('');
      page.stylesInit();
    });
    $('ul').on('click', '.filter', function(event){
      if($(this).hasClass('all')){
        $('.all').addClass('bordered');
        $('.active').removeClass('bordered');
        $('.complete').removeClass('bordered');
        $('.check').parent().removeClass('hidden');
        page.checkComplete();
      }
      if($(this).hasClass('active')){
        $('.active').addClass('bordered');
        $('.all').removeClass('bordered');
        $('.complete').removeClass('bordered');
        $('.check').parent().removeClass('hidden');
        $('.check.checked').parent().addClass('hidden');
        page.checkComplete();
      }
      if($(this).hasClass('complete')){
        $('.complete').addClass('bordered');
        $('.active').removeClass('bordered');
        $('.all').removeClass('bordered');
        $('.check').parent().addClass('hidden');
        if($('.check').hasClass('checked')){
          $('.check.checked').parent().removeClass('hidden');
        }
      }
      $('.itemsLeft').html(todoData.length - page.checkCount() + " items left");
    });
  },
  // loadTitleTemplate: function($elem, data, tmpl){
  //   var template = _.template(tmpl);
  //   var html = template(data);
  //   $elem.append(html);
  // },
  loadItemTemplate: function($elem, data, tmpl){
    var template = _.template(tmpl);
    var html;
      _.each(todoData, function(item, idx){
        console.log(idx);
        html = todoData[idx].todoItem;
        $elem.append(template(item));
      });
  },
  loadNewItem: function($elem, data, tmpl){
    var template = _.template(tmpl);
    var html = data;
    $elem.append(template(html));
  },
  checkCount: function() {
  var count = 0;
  for(var i = 0; i < todoData.length; i++) {
      if(todoData[i].isChecked) {
        count++;
      }
    }
    return count;
  },
  checkComplete: function(){
    for(var i = 0; i < todoData.length; i++){
      if(todoData[i].isChecked === true){
        $('.check:eq(' + i + ')').addClass('checked');
        $('.todoListItem:eq(' + i + ')').addClass('crossed');
      }
    }
  },
  checkedIt: function(){
    for(var i = 0; i < todoData.length; i++){
      if($('.check:eq(' + i + ')').hasClass('checked')){
        console.log("yo");
        todoData[i].isChecked = true;
      }
      else{
        todoData[i].isChecked = false;
      }
    }
  }
};
$(document).ready(function(){
  page.init();
});
