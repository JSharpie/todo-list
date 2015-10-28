var page = {
  delete: function(){

  },
  init: function(){
    $('.itemsLeft').html(todoData.length - page.checkCount() + " items left");
    page.stylesInit();
    page.eventsInit();
  },
  stylesInit: function(){
    page.checkComplete();
    page.loadItemTemplate($('.items'), todoData, $('#todoListTemplate').html());
  },
  eventsInit: function(){
    $('form').on('submit', function(event){
      event.preventDefault();
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
      page.loadNewItem($('.items'), newToDo, $('#todoListTemplate').html());
      $('.itemsLeft').html(todoData.length - page.checkCount() + " items left");
      $('.items').html('');
      page.stylesInit();
    });
    $('div').on('click', '.check', function(event){
      $(this).toggleClass('checked');
      $(this).siblings().toggleClass('crossed');
      for(var i = 0; i < todoData.length; i++){
        if($('.check:eq(' + i + ')').hasClass('checked')){
          todoData[i].isChecked = true;
        }
        else{
          todoData[i].isChecked = false;
        }
      }
      $('.itemsLeft').html(todoData.length - page.checkCount() + " items left");
    });
    $('div').on('dblclick', '.todoListItem', function(event){
       $(this).attr('contentEditable', true).blur(function(){
        $(this).attr('contentEditable', false);
        for(var i = 0; i < todoData.length; i++){
          todoData[i].todoItem = $('.todoListItem:eq(' + i + ')').text();
       }
     });
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
      $('.items').html('');
      if($(this).hasClass('all')){
        $('.all').toggleClass('bordered');
        $('.active').removeClass('bordered');
        $('.complete').removeClass('bordered');
        for(var x = 0; x < todoData.length; x++){
          page.checkComplete();
          page.loadNewItem($('.items'), todoData[x], $('#todoListTemplate').html());
        }
      }
      if($(this).hasClass('active')){
        $('.active').toggleClass('bordered');
        $('.all').removeClass('bordered');
        $('.complete').removeClass('bordered');
        $('.items').html('');
        for(var i = 0; i < todoData.length; i++){
          if(todoData[i].isChecked === false){
            page.loadNewItem($('.items'), todoData[i], $('#todoListTemplate').html());
          }
        }
      }
      if($(this).hasClass('complete')){
        $('.complete').toggleClass('bordered');
        $('.active').removeClass('bordered');
        $('.all').removeClass('bordered');
        for(var j = 0; j < todoData.length; j++){
          if(!$('.check:eq(' + j + ')').hasClass('checked')){
            $('.check:eq(' + j + ')').parent().toggleClass('hidden');
          }
        }
      }
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
}
};
$(document).ready(function(){
  page.init();
});
