function populateUser () {
  $.ajax({
    url: 'https:to-do-list-cf1af.firebaseio.com/Users.json',
    success: function(data) {
      $.each(data, function(key, value){
        var nickname = "";
        nickname += '<option ' +"value=" + key + '>' + value.NickName + '</option>';
        $("#user").append(nickname);
      });
    }
  });
}

$("#user").change(function(){
  $.ajax({
    url: "https://to-do-list-cf1af.firebaseio.com/Users/" + $("#user").val() + '.json',
    success: function(data) {
      $.each(data.Task, function(key, value){

        var task_display = "";
        task_display += "<li>" + value.title + "</li>";
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
      JSON.stringify(myData)
    )
    $("#task").val("");
  }
  // clears input field


});
$(document).ready(function(){
  populateUser();
});
