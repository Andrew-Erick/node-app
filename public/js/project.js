$(function(){
  var json=[{
    "id":1,
    "name":"C919", 
    "background":"1) C919大型客机是我国按照国际民航规章自行研制、具有自主知识产权的大型喷气式民用飞机，座级158-168座，航程4075-5555公里。",
    "rules":"XXXXXXXXXXXXXXXXX"
  }];
  var $table=$('#projectTable');
  var $remove=$('#projectRemove');
  var $toolbar=$('#projectToolbar');
  var $add=$('#projectAdd');
  var $form=$('#projectForm');
  var $modal=$('#projectModal');
  window.projectFormatter=function(value,row,index){
    // return ['<a href="javascript:void(0)" class="Edit" title="edit" data-toggle="modal" data-target='+'#'+$modal.attr("id")+'>','<i class="oi oi-pencil"></i></a>','&nbsp;&nbsp;','<a href="javascript:void(0)"  class="remove ml10" title="Remove">','<i class="oi oi-trash"></i></a>','&nbsp;&nbsp;','<a href="javascript:void(0)"  class="export ml10" title="Export" data-toggle="modal" >','<i class="oi oi-spreadsheet"></i></a>','&nbsp;&nbsp;','<a href="javascript:void(0)" class="pbs ml10" title="PBS信息">','<i class="oi oi-external-link"></i></a></a>','&nbsp;&nbsp;','<a href="javascript:void(0)" class="obs ml10" title="OBS信息">','<i class="oi oi-external-link"></i></a></a>','&nbsp;&nbsp;','<a href="javascript:void(0)" class="obsuser ml10" title="OBS人员信息">','<i class="oi oi-external-link"></i></a></a>'].join('');
  return ['<a href="javascript:void(0)" class="Edit" title="edit" data-toggle="modal" data-target='+'#'+$modal.attr("id")+'>','<i class="oi oi-pencil"></i></a>','&nbsp;&nbsp;','<a href="javascript:void(0)"  class="remove ml10" title="Remove">','<i class="oi oi-trash"></i></a>','&nbsp;&nbsp;','<a href="javascript:void(0)"  class="export ml10" title="Export" data-toggle="modal" >','<i class="oi oi-spreadsheet"></i></a>'].join('');
  };
  //  window.wbsFormatter=function(value,row,index){
  //   return value==undefined?"":("<a target='_blanket' href='/wbs/detail?id="+value._id+"'>"+value.name+"</a>");
  // };
  //  window.pbsFormatter=function(value,row,index){
  //   return row.wbs==undefined?"":("<a target='_blanket' href='/pbs/detail?id="+row.wbs.upper_pbs._id+"'>"+row.wbs.upper_pbs.name+"</a>");
  // };
  //  window.obsFormatter=function(value,row,index){
  //   return row.wbs==null?"":("<a target='_blanket' href='/obs/detail?id="+row.wbs.upper_obs._id+"'>"+row.wbs.upper_obs.name+"</a>");
  // };

  window.projectActionEvents = {
    'click .edit': function (e, value, row, index) {
      e.preventDefault();
      $form.attr({'data-add':'false','data-index':index});
      $form.find('[name]').each(function(i,item){
        var name=$(item).attr('name');
        if(name=="wbs"){
          $(item).val(row[name]._id)
        }else{
          $(item).val(row[name]);
          
        }
      });
    },
    'click .remove': function (e, value, row, index) {
      e.preventDefault();
      deleteItem([row._id],function(){
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        });     
      })
    },
    'click .export':function(e,value,row,index){
      e.preventDefault();
      var id=row._id;
      if(id){
        var data={id:id};
        $.post("/projectserver/export",data).done(function(res){
           console.log("success");
        })
      }

      // 
    },
    'click .pbs':function(e,value,row,index){
      e.preventDefault();
      console.log(row._id);
      window.open("pbs?oid="+row._id);
    },
    'click .obs':function(e,value,row,index){
      e.preventDefault();
      console.log(row._id);
      window.open("obs?oid="+row._id);
    },
    'click .obsuser':function(e,value,row,index){
      e.preventDefault();
      console.log(row._id);
      window.open("obsuser?oid="+row._id);
    }
  }
  $table.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table', function () {
    $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);

    // save your data, here just save the current page
    // selections = getIdSelections();
    // push or splice the selections if you want to save all data selections
  });
  $table.on('click-row.bs.table',function(e, row, $element){
    document.getElementById("pbsFrame").src="/pbs?oid="+row._id;
    document.getElementById("obsFrame").src="/obs?oid="+row._id;
    document.getElementById("obsuserFrame").src="/obsuser?oid="+row._id;
  })
  $remove.click(function(){
    var data=getIdSelections();
    if(data.ids.length>0){
      deleteItem(data.rowids,function(){
        $table.bootstrapTable('remove',{
          field:'_id',
          values:data.ids
        })
        $remove.prop('disabled',true);   
      })     
    }
  });
  function deleteItem(ids,next){
    $.ajax({
      type:"DELETE",
      url:"/project/delete",
      data:{
        ids:ids
      },
      success:function(){
        next()
      }
    })
  }
 function getIdSelections() {
     var rowids=$.map($table.bootstrapTable('getSelections'), function (row) {
         return row._id
     });
     var ids=$.map($table.bootstrapTable('getSelections'), function (row) {
         return row._id
     });
     return {rowids:rowids,ids:ids};
 }
  $toolbar.find('select').change(function(){
    $table.bootstrapTable({
      exportDataType:$(this).val()
    })
  })
  // func add & edit
  // add
  $add.click(function(){
    $form.attr("data-add",true);
    $form.removeAttr("data-index"); 
  });

  $modal.on('hidden.bs.modal', function() {
    $form.formValidation('resetForm', true);
  });



  // form validate
  $form.formValidation({
    framework:'bootstrap',
    excluded:':disabled',
    icon:{
      valid:'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating:'glyphicon glyphicon-refresh',
    },
    fields:{
      id:{
        validators:{
          notEmpty:{
            message:'the ID is required'
          },
          stringLength:{
            min:1,
            max:6,
            message:'The ID must be more than 1 and less than 6 characters long'
          },
          regexp:{
            regexp:/^[0-9]+$/,
            message:'The ID can only consist of number'
          }
        }
      },
      name:{},
      _id:{},
      background:{},
      rules:{}
    }
  }).on('success.form.fv',function(e){
      // Prevent form submission
      e.preventDefault();
      var $form=$(e.target);
      var data=$form.serializeObject();
      // 表单reset
      var add=$form.attr("data-add");
      var index=$form.attr("data-index");
      if(data._id==""||data._id==null){
        delete data._id;
      }
      if(data.wbs==""||data.wbs==null||data.wbs=="-1"){
        delete data.wbs;
      }
      $.post("/project/edit",data).done(function(res){
        // var data=JSON.parse(data);
        if(res!=null){
          if(add=="true"){
            $table.bootstrapTable('insertRow',{index:1,row:res});
          }else{
            $table.bootstrapTable('updateRow',{index:index,row:res});       
          }
          $modal.modal('hide');
          $form.formValidation('resetForm', true);
        }
      })
    })

})