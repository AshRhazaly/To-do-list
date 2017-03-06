function populateUser () {
  $.ajax({
    url: 'https:to-do-list-cf1af.firebaseio.com/Users.json',
    success: function(data) {
      $.each(data, function(key, value){
        var nickname = "";
        nickname += '<option ' +"value=" + key + '>' + value.NickName + '</option>';
        $("#user").append(nickname);

      });
      $.getJSON( "https://to-do-list-cf1af.firebaseio.com/Users/" + $("#user").val() + "/Task.json", function( data ) {
        var items = [];
        $("#displayTask").html("");
        $.each( data, function( key, val ) {
          items.push( "<li class='list-group-item' id='" + key + "'>" + val.title +"<span class='glyphicon glyphicon-remove delete'>" +"</span>"+ "</li>" );
          $("#displayTask").append(items);
        });
        $(".delete").click(function(){
          var $delete_list = $(this).parent();
          $.ajax({
            url: "https://to-do-list-cf1af.firebaseio.com/Users/" + $("#user").val() + "/Task/" + $(this).parent().attr("id")+ ".json",
            type: 'DELETE',
            success: function(data) {

            }
          })
          $delete_list.remove();
        });
      });

    }
  });
}

$("#user").change(function(){
  $.ajax({
    url: "https://to-do-list-cf1af.firebaseio.com/Users/" + $("#user").val() + '.json',
    success: function(data) {
      $("#displayTask").html("");
      $.each(data.Task, function(key, value){

        var task_display = "";
        task_display += "<li class='list-group-item'> " + value.title +"<span class='glyphicon glyphicon-remove delete'>" +"</span>"+ "</li>";
        $("#displayTask").append(task_display);
      })
    }
  })
})

$("#task").keypress(function(e) {

  if(e.which == 13) {
    myData = {
      completed: false,
      title: $("#task").val()
    }
    $.post(
      "https://to-do-list-cf1af.firebaseio.com/Users/" + $("#user").val() + "/Task.json",
      JSON.stringify(myData),
      function(data) {
        console.log(data);
      }
    )
    // clears input field
    $("#task").val("");
  }


});



$(document).ready(function(){
  populateUser();

});
