
  var $table=$('#obsuserTable');
  var $remove=$('#obsuserRemove');
  var $toolbar=$('#obsuserToolbar');
  var $add=$('#obsuserAdd');
  var $form=$('#obsuserForm');
  var $modal=$('#obsuserModal');
  window.obsuserFormatter=function(value,row,index){
    return ['<span class="edit" title="edit" data-toggle="modal" data-target='+'#'+$modal.attr("id")+'>','<i class="oi oi-pencil"></i></span>','&nbsp;','<span class="remove" title="remove">','<i class="oi oi-trash"></i></span>'].join('');
  };
  window.obsFormatter=function(value,row,index){
    return value==undefined?"":("<a target='_blanket' href='/obs/detail?id="+value._id+"'>"+value.name+"</a>");
  };
  window.obsuserActionEvents = {
    'click .edit': function (e, value, row, index) {
      e.preventDefault();
      $form.attr({'data-add':'false','data-index':index});
     $form.find('[name]').each(function(i,item){
        var name=$(item).attr('name');
        if(name=="upper_obs"){
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
  }
  };
  $table.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table', function () {
    $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);

    // save your data, here just save the current page
    // selections = getIdSelections();
    // push or splice the selections if you want to save all data selections
  });
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
  })

  function deleteItem(ids,next){
    $.ajax({
      type:"DELETE",
      url:"/obsuser/delete",
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
  // $table.bootstrapTable('load',json); 
  function getQueryUrl(name){
    var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r=window.location.search.substr(1).match(reg);
    if(r!=null){
      return unescape(r[2])
    }else{
      return null
    }
  }
  // func add & edit
  // add
  $add.click(function(){
    $form.attr("data-add",true);
    $form.removeAttr("data-index"); 
  });

  $modal.on('hidden.bs.modal', function() {
    $form.formValidation('resetForm', true);
  });
   $table.bootstrapTable({
      url:'/obsuser/data?oid='+getQueryUrl("oid"),
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
      role:{},
      contract:{},
      upper_obs:{}
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
      data.project=getQueryUrl('oid');
      if(data.project==""||data.project==null){
        delete data.project;
      }
      $.post("/obsuser/edit",data).done(function(res){
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
