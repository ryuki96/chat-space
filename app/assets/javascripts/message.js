

// $(document).on('turbolinks:load', function(){
  $(function(){

  
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <p class="upper-message__user-name">
                      ${message.user_name}
                    </p>
                    <p class="upper-message__date">
                      ${message.date}
                    </p>
                  </div>
                  <p class="lower-message">
                    <div>
                    ${content}
                    </div>
                    ${img}
                  </p>
                </div>`
  return html;
  }
  function scrollBottom(){
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast')
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({  
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message__detail__date){
      var html = buildHTML(message__detail__date);
      $('.messages').append(html);
      $('#message_content').val(''); 
      scrollBottom();
    })
    .fail(function(message__detail__date){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(message__detail__date){
      $('.form__submit').prop('disabled', false);  
    })
  })
  var interval = setInterval (function() { 
    if (location.href.match(/\/groups\/\d+\/messages/)){ 
     var last_message_id = $('.message').last().data("id");
     var href = 'api/messages'
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      //url: "groups/" + group_id + "/api/messages",
      url: href,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      messages.forEach(function(message) {
        var html = buildHTML(message)
        $('.messages').append(html)
        
        scrollBottom();
      })
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  } else {
    clearInterval(interval);
   }
  } , 5000 );
})
