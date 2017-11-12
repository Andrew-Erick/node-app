$("#add").on('click',function(e){
  e.preventDefault();
  var data={};
  var $form=$("form");
  // data._id=$form.find("[name=_id]").val();
  data.name=$form.find("[name=name]").val();
  data.id=$form.find("[name=id]").val();
  data.background=$form.find("[name=background]").val();
  data.rules=$form.find("[name=rules]").val();
  $.post("/project/edit",data).done(function(res){
    if(res){
      window.location.href="/project/detail?id="+res._id;
    }
  })
})