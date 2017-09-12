var json=[{
    "id":1,
    "number":"P0", 
    "name":"飞机", 
    "ata":"NA", 
    "level":"0", 
    "upper_pbs":"0", 
    "type":"0", 
  },{
    "id":2,
    "number":"P1", 
    "name":"航电系统", 
    "ata":"NA", 
    "level":1, 
    "upper_pbs":1, 
    "type":1, 
  },{
    "id":3,
    "number":"P1.1", 
    "name":"指示记录系统",
    "ata":"ATA31", 
    "level":2, 
    "upper_pbs":2, 
    "type":1, 
  },{
    "id":4,
    "number":"P1.2", 
    "name":"通信系统", 
    "ata":"ATA23", 
    "level":2, 
    "upper_pbs":2, 
    "type":1, 
  },{
    "id":5,
    "number":"P1.3", 
    "name":"导航系统", 
    "ata":"ATA34", 
    "level":2, 
    "upper_pbs":2, 
    "type":1, 
  },{
    "id":6,
    "number":"P2", 
    "name":"机械系统", 
    "ata":"NA", 
    "level":1, 
    "upper_pbs":1, 
    "type":1, 
  },{
    "id":7,
    "number":"P3", 
    "name":"中机身", 
    "ata":"NA", 
    "level":1, 
    "upper_pbs":1, 
    "type":2, 
  },{
    "id":8,
    "number":"P4", 
    "name":"机翼", 
    "ata":"NA", 
    "level":1, 
    "upper_pbs":1, 
    "type":2, 
  }];
  var $table=$('#pbsTable');
  var $remove=$('#pbsRemove');
  var $toolbar=$('#pbsToolbar');
  var $add=$('#pbsAdd');
  var $form=$('#pbsForm');
  var $modal=$('#pbsModal');
  window.pbsFormatter=function(value,row,index){
    return ['<span class="add" title="add" data-toggle="modal" data-target='+'#'+$modal.attr("id")+'>','<i class="oi oi-plus"></i></span>','&nbsp;','<span class="edit" title="edit" data-toggle="modal" data-target='+'#'+$modal.attr("id")+'>','<i class="oi oi-pencil"></i></span>','&nbsp;','<span class="remove" title="remove">','<i class="oi oi-trash"></i></span>'].join('');
  };
  // window.levelPbsFormatter=function(value,row,index){
  //   var levelValues=[0,1,2];
  //   return (value==""||value==null)?"":levelValues[value];
  // };
  // window.upper_pbsFormatter=function(value,row,index){
  //   return value==null?"":value.name;
  // };
  window.typePbsFormatter=function(value,row,index){
    var typeValues=["飞机","飞机系统","飞机设备"];
    return (value==null||value=="")?"":typeValues[value-1];
  };
  // initUpperPbs();
  // function initUpperPbs(data){
  //   $.get("/pbs/data").done(function(res){
  //     if(res!=null&&res.length>=0){
  //       var dom;
  //       if(data){
  //         res=res.filter(function(item,i){
  //           return item._id!=data;
  //         })
  //       }
  //       dom=res.map(function(item,i){
  //         return "<option value='"+item._id+"'>"+item.name+"</option>"
  //       }).join("");
  //       $("#pbsModal").find("select[name=upper_pbs]").html(dom);
  //     }
  //   })
  // }
  // initActivity();
  // function initActivity(data){
  //   $.get("/activity/data").done(function(res){
  //     if(res!=null&&res.length>=0){
  //       var dom;
  //       if(data){
  //         res=res.filter(function(item,i){
  //           return item._id!=data;
  //         })
  //       }
  //       dom=res.map(function(item,i){
  //         return "<option value='"+item._id+"'>"+item.activity+"</option>"
  //       }).join("");
  //       $("#pbsModal").find("select[name=activity]").html(dom);
  //     }
  //   })
  // }

  window.pbsActionEvents = {
    'click .edit': function (e, value, row, index) {
      e.preventDefault();
      // initUpperPbs(row._id)
      // initActivity(row._id)
      $form.attr({'data-add':'false','data-index':index});
      $form.find('[name]').each(function(i,item){
        var name=$(item).attr('name');
        if(name=="upper_pbs"){
          $(item).val(row[name]==undefined?null:row[name]._id)
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
    },'click .add': function (e, value, row, index) {
      e.preventDefault();
      // e.stopPropagation();
      $form.attr({'data-add':'true','data-index':index});
      //
      $form.find("input[name=pid]").val(row["_id"]);
      $form.find("input[name=level]").val(parseInt(row["level"])+1);
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
      url:"/pbs/delete",
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
    // initUppserPbs();
    // initActivity();
    $form.attr("data-add",true);
    $form.removeAttr("data-index"); 
  });

  $modal.on('hidden.bs.modal', function() {
    $form.formValidation('resetForm', true);
  });
   $table.bootstrapTable({
      url:'/pbs/data',
      pagination: true,
      treeView: true,
      treeId:'_id',
      treeField: "name",
      treeRootLevel: 1,
      clickToSelect: false
      //collapseIcon: "glyphicon glyphicon-triangle-right",//折叠样式
      //expandIcon: "glyphicon glyphicon-triangle-bottom"//展开样式
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
      _id:{},
      pid:{},
      level:{},
      number:{},
      name:{},
      ata:{},
      level:{},
      type:{},
    }
  }).on('success.form.fv',function(e){
      // Prevent form submission
      e.preventDefault();
      var $form=$(e.target);
      var data=$form.serializeObject();
      // 表单reset
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
      $.post("/pbs/edit",data).done(function(res){
        // var data=JSON.parse(data);
        if(res!=null){
          $table.bootstrapTable(action,{index:index,row:res});
          $modal.modal('hide');
          $form.formValidation('resetForm', true);
        }
      })
    })