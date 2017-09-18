$("#edit").on('click',function(e){
  e.preventDefault();
  $("form").find(".form-control").removeAttr("disabled");
  var $dom=e.target;
  $(e.target).attr("disabled",true);
  $("#save").attr("disabled",false);
})
$("#save").on('click',function(e){
  e.preventDefault();
  var data={};
  var $form=$("form");
  data._id=$form.find("[name=_id]").val();
  data.name=$form.find("[name=name]").val();
  data.id=$form.find("[name=id]").val();
  data.background=$form.find("[name=background]").val();
  data.rules=$form.find("[name=rules]").val();
  $.post("/project/edit",data).done(function(res){
    if(res){
    $("form").find(".form-control").attr("disabled",true);
    $(e.target).attr("disabled",true);
    $("#edit").attr("disabled",false);
      
    }
  })
})