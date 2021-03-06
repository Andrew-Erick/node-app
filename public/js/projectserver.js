
  var $table=$('#projectserverTable');
  var $remove=$('#projectserverRemove');
  var $toolbar=$('#projectserverToolbar');
  var $add=$('#projectserverAdd');
  var $form=$('#projectserverForm');
  var $modal=$('#projectserverModal');
  function initTime(time){
    var date,year;
    if(time!=""&&time!=null){
      date=new Date(time);
      var mon=date.getMonth()+1;
      var month=mon<10?("0"+mon):mon;
      var day=date.getDate()<10?("0"+date.getDate()):date.getDate();
      var hour=date.getHours()<10?("0"+date.getHours()):date.getHours();
      var minute=date.getMinutes()<10?("0"+date.getMinutes()):date.getMinutes();
      year=date.getFullYear()+"-"+month+"-"+day+" "+hour+":"+minute;
    }else{
      year="";
    }
    return year;
  }
  window.previewFormatter=function(value,row,index){
    return value==undefined?"":("<a target='_blanket' href='/preview/detail?id="+value._id+"'>"+value.name+"</a>");
  };
  window.pbsFormatter=function(value,row,index){
    return value==undefined?"":("<a target='_blanket' href='/pbs/detail?id="+value._id+"'>"+value.name+"</a>");
  };
  window.userFormatter=function(value,row,index){
    return value==undefined?"":("<a target='_blanket' href='/obsuser/detail?id="+value._id+"'>"+value.name+"</a>");
  };
  window.projectserverFormatter=function(value,row,index){
    return ['<span class="add" title="add" data-toggle="modal" data-target='+'#'+$modal.attr("id")+'>','<i class="oi oi-plus"></i></span>','&nbsp;','<span class="edit" title="edit" data-toggle="modal" data-target='+'#'+$modal.attr("id")+'>','<i class="oi oi-pencil"></i></span>','&nbsp;','<span class="remove" title="remove">','<i class="oi oi-trash"></i></span>'].join('');
  };
  window.timeFormatter=function(value,row,index){
    return (value==null||value=="")?"":initTime(value);
  }
  window.projectserverActionEvents = {
    'click .edit': function (e, value, row, index) {
      e.preventDefault();
      $form.attr({'data-add':'false','data-index':index});
      $form.find('[name]').each(function(i,item){
        var name=$(item).attr('name');
        if(name=="preview"||name=="pbs"||name=="resource"){
          $(item).val(row[name]==undefined?null:row[name]._id)
        }else if(name=="plan_start_time"){
          $(item).val(initTime(row[name]));
          $(".plan_start_time input").val(initTime(row[name]));
        }else if(name=="plan_end_time"){
          $(item).val(initTime(row[name]));
          $(".plan_end_time input").val(initTime(row[name]));
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
     'click .add': function (e, value, row, index) {
      e.preventDefault();
      // e.stopPropagation();
      $form.attr({'data-add':'true','data-index':index});
      //
      $form.find("input[name=pid]").val(row["_id"]);
      $form.find("input[name=project]").val(getQueryUrl("id"));
      $(".plan_start_time input").val("");
      $(".plan_end_time input").val("");
      $form.find("input[name=level]").val(parseInt(row["level"])+1);
    }
  };
  $table.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table', function () {
    $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);

    // save your data, here just save the current page
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
  });

  function deleteItem(ids,next){
    $.ajax({
      type:"DELETE",
      url:"/projectserver/delete",
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
  // func add & edit
  // add
  $add.click(function(){
    $form.attr("data-add",true);
    $form.removeAttr("data-index"); 
  });

  $modal.on('hidden.bs.modal', function() {
    $form.formValidation('resetForm', true);
  });
  function getQueryUrl(name){
    var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r=window.location.search.substr(1).match(reg);
    if(r!=null){
      return unescape(r[2])
    }else{
      return null
    }
  }
  // form validate
  // form validate
   $table.bootstrapTable({
      url:'/projectserver/data?id='+getQueryUrl("id"),
      pagination: true,
      treeView: true,
      treeId:'_id',
      treeField: "name",
      treeRootLevel: 1,
      clickToSelect: false
      //collapseIcon: "glyphicon glyphicon-triangle-right",//折叠样式
      //expandIcon: "glyphicon glyphicon-triangle-bottom"//展开样式
  });
  $(".plan_start_time,.plan_end_time").datetimepicker({
    language:'zh-CN',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    forceParse: 0,
    showMeridian: 1
  });
  $form.formValidation({
    framework:'bootstrap',
    excluded:':disabled',
    icon:{
      valid:'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating:'glyphicon glyphicon-refresh',
    },
    fields:{
      
      _id:{},
      name:{},
      description:{},
      pid:{},
      level:{},
      pbs:{},
      input:{},
      output:{},
      requirement:{},
      preview:{},
      tools:{},
      method:{},
      resource:{},
      plan_start_time:{},
      plan_end_time:{},
      start_time:{},
      end_time:{}
    }
  }).on('success.form.fv',function(e){
      // Prevent form submission
      e.preventDefault();
      var $form=$(e.target);
      // 表单reset
      var data=$form.serializeObject();
      var add=$form.attr("data-add");
      var index=$form.attr("data-index")==null?-1:$form.attr("data-index");
      if(add=="true"){
        index++;
      }
      var action=(add=="true"?"insertRow":"updateRow");
      if(data._id==""||data._id==null){
        delete data._id;
      }
      if(data.pid==""||data.pid==null){
        delete data.pid;
      }
      data.project=getQueryUrl('id');
      if(data.project==""||data.project==null){
        delete data.project;
      }
      $.post("/projectserver/edit",data).done(function(res){
        // var data=JSON.parse(data);
        if(res!=null){
          $table.bootstrapTable(action,{index:index,row:res});
          $modal.modal('hide');
          $form.formValidation('resetForm', true);
        }
      })
      
    })
