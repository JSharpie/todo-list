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
    for(var i = 0; i < todoData.length; i++){
      if(todoData[i].isChecked === true){
        $('.check:eq(' + i + ')').addClass('checked');
        $('.todoListItem:eq(' + i + ')').addClass('crossed');
      }
    }
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
      for(var i = 0; i < todoData.length; i++){
        if($(this).text() === todoData[i].todoItem){
          console.log("worked" + i);
        }
      }
    });
    $('ul').on('click', '.clearComplete', function(event){
      for(var i = todoData.length - 1; i>=0; i--) {
        if(todoData[i].isChecked === true) {
          todoData.splice(i, 1);
        }
      }
      $('.itemsLeft').html(todoData.length - page.checkCount() + " items left");
      $('.items').html('');
      page.stylesInit();
    });
    $('ul').on('click', 'li', function(event){
      console.log(this);
      if($(this).hasClass('all')){
        page.stylesInit();
      }
      if($(this).hasClass('active')){
        console.log("dick");
        for(var i = 0; i < todoData.length; i++){
          console.log(i);
          if($('.check:eq(' + i + ')').hasClass('checked')){
            $('.check:eq(' + i + ')').parent().toggleClass('hidden');
          }
        }
      }
      if($(this).hasClass('complete')){
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
  }
};
$(document).ready(function(){
  page.init();
});
