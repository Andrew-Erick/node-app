
var $table=$('#obsTable');
var $remove=$('#obsRemove');
var $toolbar=$('#obsToolbar');
var $add=$('#obsAdd');
var $form=$('#obsForm');
var $modal=$('#obsModal');
window.obsFormatter=function(value,row,index){
  return  ['<span class="add" title="add" data-toggle="modal" data-target='+'#'+$modal.attr("id")+'>','<i class="oi oi-plus"></i></span>','&nbsp;','<span class="edit" title="edit" data-toggle="modal" data-target='+'#'+$modal.attr("id")+'>','<i class="oi oi-pencil"></i></span>','&nbsp;','<span class="remove" title="remove">','<i class="oi oi-trash"></i></span>'].join('');
};
// window.upper_obsFormatter=function(value,row,index){
//   return value==null?"":value.name;
// };
// initUpperObs();
// function initUpperObs(data){
//   $.get("/obs/data").done(function(res){
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
//       $("#obsModal").find("select[name=upper_obs]").html(dom);
//     }
//   })
// }
window.obsActionEvents = {
  'click .edit': function (e, value, row, index) {
    e.preventDefault();
    // initUpperObs(row._id)
    $form.attr({'data-add':'false','data-index':index});
    $form.find('[name]').each(function(i,item){
      var name=$(item).attr('name');
      if(name=="upper_obs"){
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
  },
  'click .add': function (e, value, row, index) {
    e.preventDefault();
    // e.stopPropagation();
    $form.attr({'data-add':'true','data-index':index});
    //
    $form.find("input[name=pid]").val(row["_id"]);
    $form.find("input[name=project]").val(getQueryUrl('oid'));
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
    url:"/obs/delete",
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
  // initUpperObs();
  $form.attr("data-add",true);
  $form.removeAttr("data-index"); 
});

$modal.on('hidden.bs.modal', function() {
  $form.formValidation('resetForm', true);
});
$table.bootstrapTable({
  url:'/obs/data?oid='+getQueryUrl("oid"),
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
    number:{},
    name:{},
    level:{},
    type:{}
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
    data.project=getQueryUrl('oid');
      if(data.project==""||data.project==null){
        delete data.project;
      }
    $.post("/obs/edit",data).done(function(res){
      // var data=JSON.parse(data);
       if(res!=null){
        $table.bootstrapTable(action,{index:index,row:res});
        $modal.modal('hide');
        $form.formValidation('resetForm', true);
      }
    })
  })