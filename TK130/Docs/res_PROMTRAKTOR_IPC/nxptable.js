/*
 * ipc ui common script
 * nxptable.js 15:08 03.02.2012
 *
 */

var isMSIE = true;
var isOpera = false;
var isFF = false;
var isChrome = false;
var ipcScriptVersion = "2.87PT3";
var with2D = true;
var with3D = true;
var is2D = false;
var C_BLACK = new Array(0, 0, 0);
var C_DARKGREY = new Array(0.5, 0.5, 0.5);
var C_YELLOW = new Array(1, 1, 0);
var selectionChildrenColor = "transparent";
var fullTableRowColor = "#808080";
var isFirstISO = true;
var skip_animation = false;
var usageList = new Array();
var modelsList = new Array();
var sbList = new Array();
var ipcApi = null;
var workTable = null;
var preSelectedItem = "";
var cortona = null;
var Control2D = null;
var sInnerText = "innerText";
var viewer2D = 1; // 1 - Cortona2D Viewer, 2 - IsoView
var errCode = [false, ""];
var isSpPrn = false;
var isUnloaded = false;
var chrmCrc = [true, null];
var NOMENCLATURE_NUMBER = "";
var SELECTED_NUMBERS = [];

function IPCTable(table, api) {
	this.HIDE_UNUSED_ROWS = !(typeof(trueFullTable) != 'undefined' && trueFullTable);
	this.block_fit = false;
	this.unused_rows_processed = false;
	this.isBlocked = true;
	this.table = table;
	this.items = null;
	this.selectedItems = new Array();
	this.hiddenItems = new Array();
	this.changedMaterials = {items:{}, list:new Array()};
	this.cMenu = new ContextMenu(document.getElementById("menu_container"));
	this.cortona = cortona;
	this._last_over_node = null;
	this._last_over = null;
	this._last_clicked_row = 0;
	this._last3Dclicked = null;
	this.isFullTable = false;
	this.isTransferedIPCData = false;
	this.attachingRows = [];
}
IPCTable.prototype.fitToItems = IPCTable_fitToItems;
IPCTable.prototype.getItem = IPCTable_getItem;
IPCTable.prototype._transformIPCDataToIndexedFormat = IPCTable__transformIPCDataToIndexedFormat;
IPCTable.prototype.generateItems = IPCTable_generateItems;
IPCTable.prototype.update = IPCTable_update;
IPCTable.prototype.setFullTable = IPCTable_setFullTable;
IPCTable.prototype.onOver3D = IPCTable_onOver3D;
IPCTable.prototype.onClick3D = IPCTable_onClick3D;
IPCTable.prototype.onOver2D = IPCTable_onOver2D;
IPCTable.prototype.onClick2D = IPCTable_onClick2D;
IPCTable.prototype.getItemBy2DHotspot = IPCTable_getItemBy2DHotspot;
IPCTable.prototype._onItemClick = IPCTable__onItemClick;
IPCTable.prototype._onItemDblClick = IPCTable__onItemDblClick;
IPCTable.prototype._onItemOver = IPCTable__onItemOver;
IPCTable.prototype._onItemOut = IPCTable__onItemOut;
IPCTable.prototype._clearOverItem = IPCTable__clearOverItem;
IPCTable.prototype._onChkBox = IPCTable__onChkBox;
IPCTable.prototype._onCancelEvent = IPCTable__onCancelEvent;
IPCTable.prototype._onTableContextMenu = IPCTable__onTableContextMenu;
IPCTable.prototype._onContextMenuClose = IPCTable__onContextMenuClose;
IPCTable.prototype.contextMenuClose = IPCTable_contextMenuClose;
IPCTable.prototype._onClick = IPCTable__onClick;
IPCTable.prototype.clearSelection = IPCTable_clearSelection;
IPCTable.prototype.clearHighlight = IPCTable_clearHighlight;
IPCTable.prototype.hideSecondary = IPCTable_hideSecondary;
IPCTable.prototype.showAll = IPCTable_showAll;
IPCTable.prototype.resetMaterials = IPCTable_resetMaterials;
IPCTable.prototype.reset = IPCTable_reset;
IPCTable.prototype.toExcel = IPCTable_toExcel;
IPCTable.prototype.setBlock = IPCTable_setBlock;
IPCTable.prototype._onSelectionChanged = IPCTable__onSelectionChanged;
IPCTable.prototype.filter = IPCTable_filter;
IPCTable.prototype._checkUnusedItem = IPCTable__checkUnusedItem;
IPCTable.prototype.gotoItem = IPCTable_gotoItem;
IPCTable.prototype._updAttRows = IPCTable__updAttRows;
IPCTable.prototype._sortSelection = IPCTable__sortSelection;
IPCTable.prototype.setPrintMode = IPCTable_setPrintMode;

function IPCTable_filter(modelIndex, usageIndex, sbIndex){
	if(sbIndex==0){
		ipcApi.show_background_geometry();
	}else{
		ipcApi.hide_background_geometry();
	}
	ipcApi.setAutoRefreshOff();
	for(var i=0; i<this.items.length; i++){
		this.items[i].setFilteredWithoutChildren(false);
	}
	ipcApi.setAutoRefreshOn();
	if(modelIndex==0 && usageIndex==0 && sbIndex==0){
		return;
	}
	ipcApi.setAutoRefreshOff();
	var ma = (modelIndex>0)? modelsList[modelIndex-1] : 0;
	var uc = (usageIndex>0)? usageList[usageIndex-1] : 0;
	var sb = (sbIndex>0)? sbList[sbIndex-1] : 0;
	var dpl = ipc_data.dplist;
	var notfound;
	var usg, mdl, sbs;
	if(sbIndex>0){
		for(var i=0; i<dpl.length; i++){
			sbs = dpl[i].filter.sb;
			notfound = true;
			for(var g=0; g<sbs.length; g++){
				if(sbs[g]==sb){
					notfound = false;
					break;
				}
			}
			if(!notfound){
				this.items[i].setFiltered(false);
			}else{
				var isSubfiltered = false;
				for(var j=0; j<this.items[i].parents.length; j++){
					if(!this.items[i].parents[j].filtered){
						isSubfiltered = true;
						break;
					}
				}
				if(isSubfiltered){
					this.items[i].filtered = true;
					this.items[i].setRowVisibility(false);
				}else{
					this.items[i].setFilteredWithoutChildren(true);
				}
			}
		}
	}else{
		for(var i=0; i<dpl.length; i++){
			notfound = false;
			if(!notfound){
				if(usageIndex>0){
					usg = dpl[i].filter.usage;
					for(var g=0; g<usg.length; g++){
						if(usg[g]==uc){
							notfound = false;
							break;
						}else{
							notfound = true;
						}
					}
				}
				if(modelIndex>0 && !notfound){
					mdl = dpl[i].filter.modelapply;
					for(var g=0; g<mdl.length; g++){
						if(mdl[g]==ma){
							notfound = false;
							break;
						}else{
							notfound = true;
						}
					}
				}
			}
			this.items[i].setFilteredWithoutChildren(notfound);
		}
	}
	this._updAttRows();
	ipcApi.setAutoRefreshOn();
}

function IPCTable_fitToItems(items){
	if(this.block_fit) return;
	var parts = new Array();
	for(var i=0; i<items.length; i++){
		parts.push(items[i].part);
		for(var z=0; z<items[i].allChildren.length; z++){
			parts.push(items[i].allChildren[z].part);
		}
	}
	ipcApi.fitToParts(parts, "");
}

function IPCTable__onSelectionChanged(){
	if("on_selection_changed" in workTable){
		var s3d = new Array();
		for(var i=0; i<this.selectedItems.length; i++){
				s3d.push(this.selectedItems[i]);
		}
	  workTable.on_selection_changed(s3d);
	}
}

function IPCTable__transformIPCDataToIndexedFormat(){
	if(!this.isTransferedIPCData){
		this.isTransferedIPCData = true;
		var items = ipc_data.dplist;
		var views = ipc_data.views;
		var indexById = {};
	  for(var i=0; i<items.length; i++)
	   if(items[i].id!="")
	   	indexById[items[i].id] = i;
	  for(var i=0; i<items.length; i++)
	   items[i].parent = (items[i].parent in indexById) ? indexById[items[i].parent] : -1;
	  for(var j=0; j<views.length; j++)
	  {
		var items = views[j].items;
	  	for(var i=0; i<items.length; i++)
			items[i] = (items[i] in indexById) ? indexById[items[i]] : -1;
	  }
	}
}

function IPCTable_generateItems(){
	if(this.items == null){
		this._transformIPCDataToIndexedFormat();
		this.items = new Array();
		var oncl = new Function('evnt','if(!evnt)var evnt = window.event; workTable._onItemClick(this.sectionRowIndex, evnt);');
		var ondbl = new Function('workTable._onItemDblClick(this.sectionRowIndex);');
		var onovr = new Function('workTable._onItemOver(this.sectionRowIndex);');
		var onout = new Function('workTable._onItemOut(this.sectionRowIndex);');
		var oncbx = new Function('workTable._onChkBox(this.parentNode.parentNode.sectionRowIndex);');
		var oncnc = new Function('workTable._onCancelEvent();');
		var oncmnu = new Function('evnt','if(!evnt)var evnt = window.event; workTable._onTableContextMenu(this.sectionRowIndex, evnt);return false;');
		var dplist = ipc_data.dplist;
		var nodesNames;
		for(var r=0; r<dplist.length; r++){
				var itm = new IPCItem(this, r);
				this.items.push(itm);
				itm.tr.onclick = oncl;
				itm.tr.ondblclick = ondbl;
				itm.tr.onmouseover = onovr;
				itm.tr.onmouseout = onout;
				itm.chkBox.onclick = oncbx;
				itm.chkBox.ondblclick = oncnc;
				itm.tr.oncontextmenu = oncmnu;
				itm.tr.style.MozUserSelect="none";
				itm.tr.style.webkitUserSelect="none";
				this._checkUnusedItem(itm);
				if(itm.isAttachingKeyword){
					itm.unused = false;
					this.attachingRows.push(itm);
				}
		}
	}
}

function IPCTable_setBlock(flag){
  	this.isBlocked = flag;
}

function IPCTable_onOver3D(node){
  if(this.items==null || this.isBlocked || this.cMenu.checkIsOpen())return;
	if(this._last_over_node!=node){
  	if(node != null) {
			var item = this.getItem(node.tag);
			if(!item.presentInSheet || item.filtered){
				for(var g=0; g<item.parents.length; g++){
					if(item.parents[g].presentInSheet && item.parents[g].state>0 && !item.parents[g].filtered){
						item = item.parents[g];
					}
				}
			}
			this._onItemOver(item.index);
			ipcApi.tooltipOver3D.setTooltipHTML(item.getTooltipText());
		}else{
			this._onItemOver(null);
			ipcApi.tooltipOver3D.setTooltipHTML("");
		}
		this._last_over_node=node;
	}
}

function IPCTable_onClick3D(node, button, shift, X, Y){
 	if(this.items==null || this.isBlocked || this.cMenu.checkIsOpen())return;
	if(button==2 && shift<4){
		var item = null;
		this.cMenu.close();
		this.onOver3D(node);
		if(node!=null){
			var item = this.getItem(node.tag);
			if(!item.presentInSheet || item.filtered){
				for(var g=0; g<item.parents.length; g++){
					if(item.parents[g].presentInSheet && item.parents[g].state>0 && !item.parents[g].filtered){
						item = item.parents[g];
					}
				}
			}
			item.tr.scrollIntoView(true);
		}
		ipcApi.tooltipOver3D.setTooltipHTML("");
		this.cMenu.show(item, X, Y, this.cortona, true);
	}else{
		if(node!=null){
			if(shift<4){
				var item = this.getItem(node.tag);
				if(!item.presentInSheet || item.filtered){
					for(var g=0; g<item.parents.length; g++){
						if(item.parents[g].presentInSheet && item.parents[g].state>0 && !item.parents[g].filtered){
							item = item.parents[g];
						}
					}
				}
				if(shift==1 && this._last3Dclicked!=null && this._last3Dclicked.item==item && (item.selected || item.subselected)){
					var nextParent = null;
					while(item.parents.length>this._last3Dclicked.n && nextParent==null){
						this._last3Dclicked.n++;
						var _itm = item.parents[this._last3Dclicked.n];
						if(_itm!=null && _itm.state>0 && _itm.presentInSheet && !_itm.filtered){
							item = _itm;
							nextParent = _itm;
						}
					}
					if(nextParent==null)return;
				}else{
					this._last3Dclicked = {item:item, n:-1};
				}
				item.tr.scrollIntoView(true);
				this._onClick(item, (shift==2), false, true);
			}
		}else{
			if(shift==0)this.clearSelection();
		}
	}
}

function IPCTable_onOver2D(hotspot){
		for(var i=0; i<this.items.length; i++){
			if(hotspot==this.items[i].getItemNumber()){
				if(!this.items[i].filtered && !this.items[i].unused && (this.items[i].presentInSheet || this.isFullTable)){
					this._onItemOver(i);
					C2D_setTooltip(hotspot, this.items[i].getTooltipText().replace(/<br>/g, '\n'));
					return;
				}
			}
	  }
	  this._onItemOver(null);
}

function IPCTable_getItemBy2DHotspot(hotspot){
		for(var i=0; i<this.items.length; i++){
			if(hotspot==this.items[i].getItemNumber()){
				if(!this.items[i].unused){
					return this.items[i];
				}
			}
	  }
	  return null;
}

function IPCTable_onClick2D(hotspot, keystate){
		for(var i=0; i<this.items.length; i++){
			if(hotspot==this.items[i].getItemNumber()){
				if(!this.items[i].filtered){
					this.items[i].tr.scrollIntoView(true);
					this._onClick(this.items[i], (keystate>1), false, false);
					return true;
				}
			}
	  }
	  this._onItemOver(null);
	  if(keystate<2)this.clearSelection();
	  return false;
}

function IPCTable__onItemClick(n, evnt){
	if(this.items==null || this.isBlocked)return;
	try{
		var sElement = (isMSIE)? evnt.srcElement: evnt.target;
		if(sElement.nodeName.toLowerCase()=="a" && sElement.href.length>0){
			if(sElement.hash!=""){
				setTimeout("workTable.gotoItem('"+sElement.hash.substring(1)+"');", 100);
			}
			return;
		}		
	}catch(e){}
	var item = this.getItem(n);
	var ctrl = evnt.ctrlKey;
	var shift = evnt.shiftKey;
	if(!item.presentInSheet){
		if(!ctrl)this.clearSelection();
		return;
	}
	this._last3Dclicked = null;
	if(!shift){
		this._last_clicked_row = n;
	}
	this._onClick(item, ctrl, shift, false);
}

function IPCTable__onClick(item, ctrl, shift, in3D){
	if(!item.presentInSheet){
		return;
	}
	if(ctrl){
		ipcApi.setAutoRefreshOff();
		if(item.selected){
			item.select(false);
		}else if(item.subselected){
			item.select(!in3D);
		}
		else{
			item.select(true);
		}
		ipcApi.setAutoRefreshOn();
	}else if(shift){
		var clickRow = item.index;
		if(clickRow!=this._last_clicked_row){
			this.clearSelection();
			var startRow = this._last_clicked_row;
			var endRow = clickRow;
			if(startRow>endRow){
				startRow = clickRow;
				endRow = this._last_clicked_row;
			}
			ipcApi.setAutoRefreshOff();
			for(var n = startRow; n <= endRow; n++){
				var itm = this.getItem(n);
				if(itm.presentInSheet && itm.isRowVisible){
					itm.select(true);
				}
			}
			ipcApi.setAutoRefreshOn();
		}
	}else{
		if(item.selected && this.selectedItems.length==1){
			this.clearSelection();
		}else{
			this.clearSelection();
			ipcApi.setAutoRefreshOff();
			item.select(true);
			ipcApi.setAutoRefreshOn();
		}
	}
}

function IPCTable__onItemDblClick(n){
	if(this.isBlocked || this.block_fit)return;
	var item = this.getItem(n);
	if(item.state>0 && item.presentInSheet){
		item.fit();
	}
	try{
		if(window.getSelection)window.getSelection().removeAllRanges();
		else if(document.selection)document.selection.empty();
	}catch(err){}
}
function IPCTable__onItemOver(n){
	if(this.isBlocked || this.cMenu.checkIsOpen())return;
	if(this._last_over == n)return;
	var lvr = this._last_over;
	if(lvr != null) {
		ipcApi.setAutoRefreshOff();
		try{
			this.getItem(lvr).hlight(false);
		}catch(err){}
		ipcApi.setAutoRefreshOn();
		ipcApi.doRefresh();
	}
	if(n!=null){
		ipcApi.setAutoRefreshOff();
		this.getItem(n).hlight(true);
		ipcApi.setAutoRefreshOn();
	}
	this._last_over = n;
}

function IPCTable__onItemOut(n){
	if(this.isBlocked || this.cMenu.checkIsOpen())return;
	if(this._last_over == n){
		this._onItemOver(null);
	}
}

function IPCTable__clearOverItem(){
	if(this.isBlocked)return;
	ipcApi.setAutoRefreshOff();
	if(this._last_over != null) {
		this.getItem(this._last_over).hlight(false);
	}
  	ipcApi.setAutoRefreshOn();
}

function IPCTable__onChkBox(n){
	if(this.isBlocked)return;
	ipcApi.setAutoRefreshOff();
	var item = this.getItem(n);
	if(item.state>=0 && item.presentInSheet){
		item.show(item.state<=0);
	}
  if(window.event)window.event.cancelBubble = true;
  	ipcApi.setAutoRefreshOn();
}

function IPCTable__onCancelEvent(){
	if(isMSIE){
		document.selection.empty();
		if(window.event)window.event.cancelBubble = true;
	}
}

function IPCTable__onTableContextMenu(n, evnt){
	var x = evnt.clientX;
	var y = evnt.clientY;
	
	this.cMenu.close();
	this._onItemOver(n);
	var item = this.getItem(n);
	ipcApi.tooltipOver3D.setTooltipHTML("");
	this.cMenu.show(item, x, y, document.body, false);
}

function IPCTable__onContextMenuClose(){
	this.clearHighlight();
	if(this.cMenu.isOver3D){
		this.cortona.focus();
	}
}

function IPCTable_contextMenuClose(){
	this.cMenu.close();
}

function IPCTable__checkUnusedItem(item){
	if(!this.HIDE_UNUSED_ROWS)return false;
	if(item.__processed)return item.unused;
	var vs = rightViews;
	var indx = item.index;
	for(var i=0; i<vs.length; i++){
		if(!vs[i].hidden){
			var v = vs[i];
			for(var j=0; j<v.items.length; j++){
				if(v.items[j]==indx){
					item.__processed = true;
					item.unused = false;
					return false;
				}
			}
		}
	}
	item.__processed = true;
	item.unused = true;
	return true;
}

function IPCTable_setFullTable(flag){
	this.isFullTable = flag;
	for(var i=0; i<this.items.length; i++){
		if(!this.items[i].filtered && !this.items[i].unused)this.items[i].setRowVisibility(this.isFullTable || this.items[i].presentInSheet);
		this.items[i].updateCheckBox();
  }
  this._updAttRows();
}

function IPCTable_update(){
	this.generateItems();
	var vs = rightViews;
	var sheet_items = {};
	for(var i=0; i<vs.length; i++){
		if(vs[i].id==current_view){
			for(var z=0; z< vs[i].items.length; z++){
				sheet_items[vs[i].items[z]]=true;
			}
		}
	}
  for(var i=0; i<this.items.length; i++){
	this.items[i].presentInSheet = (i in sheet_items || this.items[i].isAttachingKeyword);
	if(!this.items[i].filtered)this.items[i].setRowVisibility(this.isFullTable || this.items[i].presentInSheet);
  	this.items[i].update();
  }
  for(var i=0; i<this.items.length; i++){
 		this.items[i].update2();
  	this.items[i].updateCheckBox();
  }
  this._updAttRows();
  this.hideSecondary();
}

function IPCTable_getItem(n){
	return this.items[n];
}

function IPCTable_clearSelection(){
	ipcApi.doRefresh();
	ipcApi.setAutoRefreshOff();
	this._sortSelection();
	var selection = this.selectedItems;
	for(var i=selection.length-1; i>=0; i--){
		selection[i].select(false);
	}
	ipcApi.restoreAutoRefresh();
}

function IPCTable_hideSecondary(){
	ipcApi.doRefresh();
	ipcApi.setAutoRefreshOff();
	for(var i=0; i<this.items.length; i++){
		if(this.items[i].presentInSheet && this.items[i].dpl_item.secondary){
			 this.items[i].show(false);
		}
  }
	ipcApi.restoreAutoRefresh();
}

function IPCTable_showAll(){
	var hidden = this.hiddenItems;
	for(var i=0; i<hidden.length; i++){
		hidden[i].show(true);
	}
}

function IPCTable_resetMaterials(){
	var trItems = this.changedMaterials.list;
	for(var z=0; z<trItems.length; z++){
		trItems[z].resetMaterial();
	}
	this.changedMaterials = {items:{}, list:new Array()};
}

function IPCTable_clearHighlight(){
	if(this.cMenu.checkIsOpen())return;
	this._clearOverItem();
	this._last_over_node = null;
	this._last_over = null;
}

function IPCTable_reset(){
	this.clearSelection();
	this._clearOverItem();
	this.filter(0, 0, 0);
	this._last_over_node = null;
	this._last_over = null;
	this.showAll();
	this.resetMaterials();
}

function IPCTable_toExcel(){
	function _replaceCR(s){
		return s.replace(/\r/g, '');
	}
	function _getCh(s){
   		if(s.match(/\S/m)){
			return ""+s;
		}else{
			return "";
		}
	}
	if(this.isBlocked)return;
	try{
		var oXL = new ActiveXObject("Excel.Application");
		oXL.Visible = false;
		var oWB = oXL.Workbooks.Add();
		var oSheet = oWB.ActiveSheet;
		var xTitle = M_TITLE;
		if(specType!="GENERIC")xTitle = M_CSN;
		if(specType=="ITEM")xTitle = M_TOOLNBR;
		try{
			oSheet.Name = xTitle;
		}catch(e){oSheet.Name = (specType=="ITEM")? "ITEM": "IPC";}
		var tTitle = (typeof(iExcelTitle) != 'undefined')? iExcelTitle: iPrint3DHeaderTitle;
		var startRow = 4;
		if(tTitle!=""){
		  oSheet.Cells(1, 2).NumberFormat = '@';
		  oSheet.Cells(1, 2).Value = tTitle;
		  oSheet.Cells(1, 2).Font.Size = 10;
		  //oSheet.Cells(1, 2).Font.Bold = true;
		  oSheet.Cells(2, 2).NumberFormat = '@';
		  oSheet.Cells(2, 2).Value = xTitle;
		  oSheet.Cells(2, 2).Font.Size = 10;
		  oSheet.Cells(2, 2).Font.Bold = true;
		}else{
		  oSheet.Cells(1, 2).NumberFormat = '@';
		  oSheet.Cells(1, 2).Value = xTitle;
		  oSheet.Cells(1, 2).Font.Size = 10;
		  oSheet.Cells(1, 2).Font.Bold = true;
			startRow = 2;
		}
	  var ths = mainHeader.rows[1].cells;
	  if(ths.length<2) return;
	  var columnsNumber = ths.length-1;
	  var correctXHeader = ((typeof(iExcelCorrectHeader) != 'undefined') && iExcelCorrectHeader);
	  for(var i=1; i<=columnsNumber; i++){
	  	oSheet.Cells(startRow, i).NumberFormat = '@';
	  	if(correctXHeader && ths[i].className=="bot"){
	  		var vl = ths[i][sInnerText];
	  		try{vl = vl.split("\n")[0];}catch(err){}
	  		oSheet.Cells(startRow, i).Value = _getCh(_replaceCR(vl));
	  	}else{
	  		oSheet.Cells(startRow, i).Value = _getCh(_replaceCR(ths[i][sInnerText]));
	  	}
	  	try{oSheet.Cells(startRow, i).ColumnWidth = 100;}catch(wderr){}
	  }
	  oSheet.Cells(startRow, 1).ColumnWidth = 2;
	  var oHeader = oSheet.Range(oSheet.Cells(startRow, 1), oSheet.Cells(startRow, columnsNumber));
	  oHeader.Font.Bold = true;
	  oHeader.Font.Size = 8;
	  oHeader.VerticalAlignment =  -4108;
	  oSheet.Range(oSheet.Cells(startRow, 2), oSheet.Cells(startRow, columnsNumber)).Borders.Weight = -4138;
	  var rowNumber = startRow;
	  try{
		  if(mainHeader.rows.length>2){
				rowNumber++;
				oSheet.Range(oSheet.Cells(rowNumber, 1), oSheet.Cells(rowNumber, columnsNumber)).NumberFormat = '@';
				var clss = mainHeader.rows[2].cells;
				oSheet.Cells(rowNumber, 1).Value = _getCh(_replaceCR(clss[0][sInnerText]));
				for(var j=2; j<=columnsNumber; j++){
			  	oSheet.Cells(rowNumber, j).Value = _getCh(_replaceCR(clss[j][sInnerText]));
			  }
		  }
	  }catch(e){}
	  this._sortSelection();
	  var tableItems = this.selectedItems;
	  if(tableItems.length==0)tableItems = this.items;
	  for(var i=0; i<tableItems.length; i++){
			if(tableItems[i].isRowVisible){
				rowNumber++;
				oSheet.Range(oSheet.Cells(rowNumber, 1), oSheet.Cells(rowNumber, columnsNumber)).NumberFormat = '@';
				var clss = tableItems[i].tr.cells;
				oSheet.Cells(rowNumber, 1).Value = _getCh(_replaceCR(clss[0][sInnerText]));
				for(var j=2; j<=columnsNumber; j++){
			  	oSheet.Cells(rowNumber, j).Value = _getCh(_replaceCR(clss[j][sInnerText]));
			  }
			}
	  }
	  if(rowNumber>startRow){
		  var dataRande = oSheet.Range(oSheet.Cells(startRow+1, 2), oSheet.Cells(rowNumber, columnsNumber));
		  dataRande.Borders(7).Weight = -4138;
		  dataRande.Borders(9).Weight = -4138;
		  dataRande.Borders(10).Weight = -4138;
		  dataRande.Borders(11).Weight = -4138;
		  dataRande.VerticalAlignment =  -4160;
		  try{
		  	oSheet.Range(oSheet.Cells(startRow+1, 1), oSheet.Cells(rowNumber, columnsNumber)).Font.Name = "Courier New";
		  }catch(e){}
	  }
	  oSheet.Range(oSheet.Cells(startRow, 1), oSheet.Cells(rowNumber, columnsNumber)).Columns.AutoFit();
	  oXL.Visible = true;
	  oXL.UserControl = true;
	}catch(e){
		if(typeof(iWarningExcelNotFound) != 'undefined'){
			alertx(iWarningExcelNotFound);
		}else{
			alertx('Cannot create an Excel ActiveX object.');
		}
	}
}

function IPCTable_gotoItem(itemnbr){
	var item = null;
	var item_n = -1;
	var nmbrs = [itemnbr];
	if(itemnbr.length>0 && itemnbr.charAt(0)=='0'){
		for(var z=0; z<itemnbr.length; z++){
	  	nmbrs.push(itemnbr.substr(z));
	   	if(itemnbr.charAt(z)!='0')break;
		}
	}
	for(var i=0; i<this.items.length && item==null; i++){
		var n = this.items[i].getItemNumber();
		for(var j=0; j<nmbrs.length; j++){
			if(nmbrs[j]==n){
				item = this.items[i];
				item_n = n;
				break;
			}
		}
	}	
	if(item!=null){
		try{location.hash="#";}catch(e){}
		if(item.presentInSheet){
			workTable.onClick2D(item_n, 0);
		}else{
			var itemSheet = getDefaultView(item_n);
			if(itemSheet!="")activateView(itemSheet);
		}
	}
}

function IPCTable__updAttRows(){
	for(var i=0; i<this.attachingRows.length; i++){
		var aprts = this.attachingRows[i].attparts;
		var vsblt = false;
		for(var j=0; j<aprts.length; j++){
			if(aprts[j].isRowVisible){
				vsblt = true;
				break;
			}
		}
		this.attachingRows[i].setRowVisibility(vsblt);
	}
}

function IPCTable__sortSelection(){
	var ns = [];
	for(var i=0; i<this.items.length; i++){
		if(this.items[i].selected){
			ns.push(this.items[i]);
		}
	}
	this.selectedItems = ns;
}

function IPCTable_setPrintMode(flag){
	var itm;
	if(flag){
		for(var z=0; z<this.items.length; z++){
			itm = this.items[z];
			if(!itm.unused){
				itm.tr.style.display = '';
				for(var i=0; i<itm.tr.cells.length; i++)itm.tr.cells[i].style.color="";
			}
  		}
    }else{
    	for(var z=0; z<this.items.length; z++){
			itm = this.items[z];
			if(!itm.unused){
				itm.tr.style.display = (itm.isRowVisible)? '': 'none';
				for(var i=0; i<itm.tr.cells.length; i++)itm.tr.cells[i].style.color=(itm.presentInSheet) ? "" : fullTableRowColor;
			}
  		}
    }
}

//==============================================================================
//  IPCItem
//==============================================================================
function IPCItem(tbl, n) {
	this.index = n;
	this.dpl_item = ipc_data.dplist[n];
	this.table = tbl;
	this.nn = (this.dpl_item.nn!="")? this.dpl_item.nn : "NONUMBER";
  this.tr = tbl.table.tBodies[0].rows[n];
    this.isAttachingKeyword = (typeof(this.dpl_item.attachingKeyword) != 'undefined');
	this.attparts = [];
	if(this.isAttachingKeyword && this.dpl_item.attachingKeyword==1){
	  for(var i=n-1; i>0; i--){
	  	  var aitm = tbl.items[i];
	  	  if(aitm.isAttachingKeyword){
	  	  	  aitm.attparts=this.attparts;
	  	  	  break;
	  	  }else{
	  	  	  this.attparts.push(aitm);
	  	  }
	  }
	}
	this.state = 1;
	this.chkBox = this.tr.cells[1].firstChild;
	if(this.chkBox.nodeName.toLowerCase()!="span"){
		var c1 = this.tr.cells[1].childNodes;
		for(var i=0; i<c1.length; i++){
			if(c1[i].nodeName.toLowerCase()=="span"){
				this.chkBox = c1[i];
			}
		}
	}
	this.presentInSheet = true;
	this.isRowVisible = false;
	this.part = ipcApi.getIPCPartByIndex(n);
	if(this.part.withoutGeometry){
			this.state = -2;
	}else{
		if(this.part.checkFullTransparency()){
			this.state = -1;
		}
	}
	if(this.state != 1){
		this.updateCheckBox();
	}
	this.parents = new Array();
	var tp = this.dpl_item.parent;
	while(tp>=0){
		var parent_item = this.table.items[tp];
		this.parents.push(parent_item);
		if(this.parents.length==1){
			parent_item.children.push(this);
		}
		parent_item.allChildren.push(this);
		tp = parent_item.dpl_item.parent;
	}
	this.children = new Array();
	this.allChildren = new Array();
	this.selected = false;
	this.subselected = false;
	this.hlighted = false;
	this.filtered = false;
	this.unused = false;
	this.__processed = false;
	try{if((typeof(tblTooltip) != 'undefined') && tblTooltip && ("tooltip" in this.dpl_item))this.tr.title=this.dpl_item.tooltip;}catch(err){}
}
IPCItem.prototype.updateCheckBox = IPCItem_updateCheckBox;
IPCItem.prototype.setRowVisibility = IPCItem_setRowVisibility;
IPCItem.prototype.update = IPCItem_update;
IPCItem.prototype.update2 = IPCItem_update2;
IPCItem.prototype.select = IPCItem_select;
IPCItem.prototype.subselect = IPCItem_subselect;
IPCItem.prototype.show = IPCItem_show;
IPCItem.prototype.hlight = IPCItem_hlight;
IPCItem.prototype.setTransparency = IPCItem_setTransparency;
IPCItem.prototype.getTransparency = IPCItem_getTransparency;
IPCItem.prototype.restore3DSelection = IPCItem_restore3DSelection;
IPCItem.prototype.paint3D = IPCItem_paint3D;
IPCItem.prototype.resetMaterial = IPCItem_resetMaterial;
IPCItem.prototype.getTooltipText = IPCItem_getTooltipText;
IPCItem.prototype.getItemNumber = IPCItem_getItemNumber;
IPCItem.prototype.getTitle = IPCItem_getTitle;
IPCItem.prototype.fit = IPCItem_fit;
IPCItem.prototype.setFiltered = IPCItem_setFiltered;
IPCItem.prototype.setFilteredWithoutChildren = IPCItem_setFilteredWithoutChildren;
IPCItem.prototype.getVisibility = IPCItem_getVisibility;
function IPCItem_getVisibility(){
	if(this.part.getVisibility()){
		return true;
	}else{
		for(var i=0; i<this.allChildren.length; i++){
			if(this.allChildren[i].part.getVisibility()){
				return true;
			}
		}
	}
	return false;
}

function IPCItem_setFiltered(flag){
	if(this.filtered != flag){
		ipcApi.setAutoRefreshOff();
		this.filtered = flag;
		this.part.filter(flag);
		if(this.state>=0){
			for(var i=0; i<this.allChildren.length; i++){
				this.allChildren[i].part.filter(flag);
			}
		}
		ipcApi.restoreAutoRefresh();
		if(this.filtered){
			this.setRowVisibility(false);
		}else{
			this.setRowVisibility(this.table.isFullTable || this.presentInSheet)
		}
	}
}
function IPCItem_setFilteredWithoutChildren(flag){
	if(this.filtered != flag){
		this.filtered = flag;
		this.part.filter(flag);
		if(this.filtered){
			this.setRowVisibility(false);
		}else{
			this.setRowVisibility(this.table.isFullTable || this.presentInSheet)
		}
	}
}

function IPCItem_updateCheckBox(){
  var img = "";
  if(this.presentInSheet){
  	  	if(this.state==0){
			this.chkBox.style.backgroundPosition = "0 0";
			img = "hide";
		}else if(this.state==1){
			this.chkBox.style.backgroundPosition = "-12px 0";
			img = "show";
		}else if(this.state==2){
			this.chkBox.style.backgroundPosition = "-24px 0";
			img = "partial";
		}else if(this.state==-1){
			this.chkBox.style.backgroundPosition = "-60px 0";
		}else if(this.state==-2){
			this.chkBox.style.backgroundPosition = "-48px 0";
			img = "none";
		}else if(this.state==-3){
			this.chkBox.style.backgroundPosition = "-48px 0";
			img = "none";
		}
	}else{
		if(this.state<=-2){
			this.chkBox.style.backgroundPosition = "-48px 0";
			img = "none";
		}else{
			this.chkBox.style.backgroundPosition = "-60px 0";
		}
	}
	if(img.length>0){
		this.chkBox.innerHTML = '<img class="invisibleInView" src="'+resFolder+'box'+img+'.gif" border="0" alt="" width="11" height="11">';
	}else{
		this.chkBox.innerHTML = "";
	}
}
function IPCItem_setRowVisibility(flag){
	if(!flag || !this.unused){
		this.tr.style.display = (flag)? '': 'none';
		this.isRowVisible = flag;
	}
}

function IPCItem_update(){
	if(this.state>=-1){
		if(this.part.checkFullTransparency()){
			this.state = -1;
		}else{
			this.state = 1;
		}
	}
	for(var i=0; i<this.tr.cells.length; i++)this.tr.cells[i].style.color=(this.presentInSheet) ? "" : fullTableRowColor;
}
function IPCItem_update2(){
	if(this.state==-1){
		for(var i=0; i<this.allChildren.length; i++){
			if(this.allChildren[i].state>0){
				this.state=1;
				break;
			}
		}
	}
}

function IPCItem_show(visible){
	if(this.state<0)return;
	if(!visible){
			this.table.hiddenItems.push(this);
	}else{
			this.table.hiddenItems = this.table.hiddenItems.remove(this);
	}
	ipcApi.setAutoRefreshOff();
	this.part.show(visible);
	for(var i=0; i<this.allChildren.length; i++){
		this.allChildren[i].part.show(visible);
	}
/*
	if(visible){
		for(var i=0; i<this.parents.length; i++){
			this.parents[i].part.show(visible);
		}
	}
*/
	ipcApi.restoreAutoRefresh();
	ipcApi.doRefresh();
	this.state = (visible)? 1 : 0;
	this.updateCheckBox();
	var childItem;
	for(var i=0; i<this.allChildren.length; i++){
		childItem = this.allChildren[i];
		if(childItem.state>=0 && childItem.presentInSheet){
			childItem.state = this.state;
			childItem.updateCheckBox();
		}
	}
	var parentItem;
	var isPartialVisibility = false;
	for(var i=0; i<this.parents.length; i++){
		parentItem = this.parents[i];
		if(parentItem.state>=0 && parentItem.presentInSheet){
			if(visible){
				if(!isPartialVisibility){
					var chld = parentItem.allChildren;
					for(var z=0; z<chld.length; z++){
						if(chld[z].presentInSheet && chld[z].state == 0){
							isPartialVisibility = true;
							break;
						}
					}
				}
				parentItem.state = (isPartialVisibility) ? 2 : 1;
			}else{
				if(!isPartialVisibility){
					isPartialVisibility = parentItem.getVisibility();
					if(!isPartialVisibility){
						var chld = parentItem.allChildren;
						for(var z=0; z<chld.length; z++){
							isPartialVisibility = chld[z].getVisibility();
							if(isPartialVisibility)break;
						}
					}
				}
				parentItem.state = (isPartialVisibility) ? 2 : 0;
			}
			parentItem.updateCheckBox();
		}
	}
  }

function IPCItem_paint3D(flag){
	ipcApi.setAutoRefreshOff();
	if(flag){
		this.part.setDiffuseColor(C_YELLOW);
		for(var i=0; i<this.allChildren.length; i++){
			this.allChildren[i].part.setDiffuseColor(C_YELLOW);
		}
		if(!(this.index in this.table.changedMaterials.items)){
				this.table.changedMaterials.items[this.index]=0;
				this.table.changedMaterials.list.push(this);
			}
	}else{
		this.part.restoreVrmlNodesMaterial();
		for(var i=0; i<this.allChildren.length; i++){
			this.allChildren[i].part.restoreVrmlNodesMaterial();
		}
	}
	ipcApi.restoreAutoRefresh();
}

function IPCItem_resetMaterial(){
	ipcApi.setAutoRefreshOff();
	this.part.resetVrmlNodesMaterial();
	for(var i=0; i<this.allChildren.length; i++){
		this.allChildren[i].part.resetVrmlNodesMaterial();
	}
	ipcApi.restoreAutoRefresh();
}

function IPCItem_select(flag){
  if(this.isAttachingKeyword) return;
	this.tr.style.backgroundColor = (flag) ? selectionColor : "transparent";
	if(this.selected != flag){
		if(flag){
			this.table.selectedItems.push(this);
		}else{
			this.table.selectedItems = this.table.selectedItems.remove(this);
		}
	}
	this.selected = flag;
	this.subselected = false;
	if(this.state>=0){
		this.paint3D(flag);
		for(var z=0; z<this.children.length; z++){
				this.children[z].subselect(flag);
		}
	}
	var isIllustrated = C2D_findHotspot(this.getItemNumber());
	if(isIllustrated){
		if(flag){
			select_iso(this.getItemNumber());
		}else{
			unselect_iso(this.getItemNumber());
		}
	}
	this.table._onSelectionChanged();
}

function IPCItem_restore3DSelection(){
	if(this.state>=0){
		if(!this.subselected){
			this.paint3D(this.selected);
		}
		for(var z=0; z<this.children.length; z++){
			this.children[z].restore3DSelection();
		}
	}
}

function IPCItem_subselect(flag){
	if(this.selected && !flag){
		ipcApi.doRefresh();
		this.restore3DSelection();
	}else{
		if(!this.selected){
			this.tr.style.backgroundColor = (flag) ? selectionChildrenColor : "transparent";
			this.subselected = flag;
		}
		for(var i=0; i<this.children.length; i++){
			this.children[i].subselect(flag);
		}
	}
}

function IPCItem_hlight(flag){
  if(this.isAttachingKeyword) return;
	if(is2D){
  	var isIllustrated = C2D_findHotspot(this.getItemNumber());
  	if(flag){
			this.tr.style.backgroundColor = (isIllustrated)? higlightColor : notfoundColor;
			if(isIllustrated)hlight_iso(this.getItemNumber());
		}else{
			if(this.selected){
				this.tr.style.backgroundColor = selectionColor;
				if(isIllustrated)select_iso(this.getItemNumber());
			}else if(this.subselected){
				this.tr.style.backgroundColor = selectionChildrenColor;
				if(isIllustrated)unhlight_iso(this.getItemNumber());
			}else{
				this.tr.style.backgroundColor = "transparent";
				if(isIllustrated)unhlight_iso(this.getItemNumber());
			}
		}
	}else{
		if(flag){
			this.tr.style.backgroundColor = (this.state>0)? higlightColor : notfoundColor;
			if(this.state>=0){
				ipcApi.setAutoRefreshOff();
				this.part.setEmissiveColor(C_DARKGREY);
				for(var i=0; i<this.allChildren.length; i++){
					this.allChildren[i].part.setEmissiveColor(C_DARKGREY);
				}
				ipcApi.restoreAutoRefresh();
			}
		}else{
			if(this.selected){
				this.tr.style.backgroundColor = selectionColor;
			}else if(this.subselected){
				this.tr.style.backgroundColor = selectionChildrenColor;
			}else{
				this.tr.style.backgroundColor = "transparent";
			}
			if(this.state>=0){
				ipcApi.setAutoRefreshOff();
				this.part.setEmissiveColor(C_BLACK);
				for(var i=0; i<this.allChildren.length; i++){
					this.allChildren[i].part.setEmissiveColor(C_BLACK);
				}
				ipcApi.restoreAutoRefresh();
			}
		}
	}
	this.hlighted = flag;
}

function IPCItem_setTransparency(fValue){
	if(this.state>=0){
			ipcApi.setAutoRefreshOff();
			this.part.setTransparency(fValue);
			for(var i=0; i<this.allChildren.length; i++){
				this.allChildren[i].part.setTransparency(fValue);
			}
			ipcApi.restoreAutoRefresh();
			if(!(this.index in this.table.changedMaterials.items)){
				this.table.changedMaterials.items[this.index]=0;
				this.table.changedMaterials.list.push(this);
			}
	}
}
function IPCItem_getTransparency(){
	if(this.state>=0){
		return this.part.getTransparency();
	}
	return 0;
}

function IPCItem_getTooltipText(){
	var outstr = "";
	if(this.table._checkUnusedItem(this)){
		for(var i=0; i<this.dpl_item.links.length; i++){
			outstr += this.dpl_item.links[i].description+"<br>";
		}
	}else{
		if("tooltip" in this.dpl_item){
			outstr = this.dpl_item.tooltip.replace(/\n/g, '<br>');
		}else if(this.getItemNumber().match(/\S/m)){
			outstr = iItemNamePrefix+" "+ this.getItemNumber();
		}
	}
	return outstr;
}

function IPCItem_getItemNumber(){
	if("itemnumber" in this.dpl_item)	return this.dpl_item.itemnumber;
	else if(this.dpl_item.note) return "NOTE";
	else return " ";
}

function IPCItem_getTitle(){
	var ttl = this.getItemNumber();
	if(ttl.match(/\S/m)){
		ttl = iItemNamePrefix+" "+ ttl;
	}
	return ttl;
}

function IPCItem_fit(){
	if(this.table.block_fit)return;
	var parts = new Array();
	parts.push(this.part);
	for(var z=0; z<this.allChildren.length; z++){
			parts.push(this.allChildren[z].part);
	}
	ipcApi.fitToParts(parts, "");
}


//==============================================================================
//  ContextMenu
//==============================================================================
var isWaitMenu = false;
var menuTimeout = null;
function CloseContextMenu(){
	if(workTable!=null && workTable.cMenu!=null)workTable.cMenu.close();
}
function SmartCloseContextMenu(X, Y){
	if(workTable!=null && workTable.cMenu!=null){
		if(!workTable.cMenu.checkPoint(X, Y)){
			workTable.cMenu.close();
		}
	}
}
function OnContextMenuBlur(){
	if(menuTimeout!=null)clearTimeout(menuTimeout);
	if(!isWaitMenu)menuTimeout = setTimeout("CloseContextMenu()", 0);
}
function ContextMenuNoBlur(isWait){
	isWaitMenu = isWait;
	if(menuTimeout!=null)clearTimeout(menuTimeout);
	document.getElementById('cmenu_anchor').focus();
	return false;
}
function CheckContextMenuOpen(){
	return (workTable.cMenu!=null && workTable.cMenu.checkIsOpen());
}

function ContextMenu(contextSpan){
this.oContextHTML = contextSpan;
var cncl = new Function('return false;');
this.oContextHTML.onselectstart = cncl;
this.oContextHTML.oncontextmenu = cncl;
this.oContextHTML.style.MozUserSelect="none";
this.oContextHTML.style.webkitUserSelect="none";
this.isOpen=false;
this.coords = [0, 0, 0, 0];
this.isOver3D = false;
}

ContextMenu.prototype.show = ContextMenu_show;
ContextMenu.prototype.close = ContextMenu_close;
ContextMenu.prototype.checkIsOpen = ContextMenu_checkIsOpen;
ContextMenu.prototype.checkPoint = ContextMenu_checkPoint;

function ContextMenu_show(item, ax, ay, coordElement, in3D){
if(item!=null && (ipc_data.dplist[item.index].note || ipc_data.dplist[item.index].attachingKeyword))return;
	function getOption(txt, onclick, enabled){
		if(enabled){
			return "<tr><td colspan='2' style='background-color: "+cMenuBackgroundColor+"; color: #000000; font-family:tahoma, sans-serif; font-size:8pt; padding: 2px 17px 2px 17px; cursor: default; white-space : nowrap; text-align : left;' onmouseover='this.style.color=\"#FFFFFF\"; this.style.backgroundColor=\"#000080\";' onmouseout='this.style.color=\"#000000\"; this.style.backgroundColor=\""+cMenuBackgroundColor+"\";' onmousedown='ContextMenuNoBlur(true);' onmouseup='ContextMenuNoBlur(false);' onclick='"+onclick+" workTable.contextMenuClose();'>" +txt+ "</td></tr>";
		}else{
			return "<tr><td colspan='2' disabled style='background-color: "+cMenuBackgroundColor+"; color: #707070; font-family:tahoma, sans-serif; font-size:8pt; padding: 2px 17px 2px 17px; cursor: default; white-space : nowrap; text-align : left;'>" +txt+ "</td></tr>";
		}
	}
	function getPosition(element){var left = element.offsetLeft; var top = element.offsetTop; for (var parent = element.offsetParent; parent; parent = parent.offsetParent){left += parent.offsetLeft; top += parent.offsetTop;}return {left: left, top: top};}
	var brdColor = (isFF && in3D)? "#C0C0C0": "#FFFFFF";
	var hrOption = "<tr><td colspan='2' style='background-color: "+cMenuBackgroundColor+"; padding: 0px 2px 0px 2px; cursor: default;'><hr></td></tr>";
	var tableSyntax = "<a id='cmenu_anchor' style='text-decoration: none;cursor: default;' onblur='OnContextMenuBlur();' onmousedown='ContextMenuNoBlur(true);' onmouseup='ContextMenuNoBlur(false);' onclick='return false;' href='#'><div style='border: 1px solid; border-color: #C0C0C0 #000000 #000000 #C0C0C0;'><div style='border: 1px solid; border-color: "+brdColor+" #808080 #808080 "+brdColor+"; background-color: "+cMenuBackgroundColor+"; padding: 2px 2px 2px 2px;'><table style='border-collapse:collapse;'>";
	var cmTitle = (item!=null) ? item.getTitle() : " ";
	tableSyntax += "<tr><th style='background-color: "+cMenuBackgroundColor+"; color: #000000; font-family:tahoma, sans-serif; font-size: 9pt; padding: 2px 0 2px 17px; cursor: default; font-weight:bold; white-space : nowrap; text-align : left;'>"+cmTitle+"</th>";
	tableSyntax += "<th aligh='right' style='background-color: "+cMenuBackgroundColor+"; padding: 1px 1px 1px 1px;'><div style='float : right; color: #000000; height:18px; width:18px; font-size:14px; border: 1px solid "+cMenuBackgroundColor+"; font-weight:bold; text-align : center; vertical-align : middle; cursor: pointer;' title='"+iContextMenuCloseButtonToolTip+"' onmouseover='this.style.borderColor =\"#000000\";' onmouseout='this.style.borderColor=\""+cMenuBackgroundColor+"\";' onclick='workTable.contextMenuClose();'>&#0215;</div></th></tr>";
	tableSyntax += hrOption;
	if(item!=null && iContextAddToBasket!=""){
		tableSyntax += getOption(iContextAddToBasket, "addToCart("+item.index+");", true);
		tableSyntax += hrOption;
	}
	if(item!=null && iContextMoreInfo!=""){
		tableSyntax += getOption(iContextMoreInfo, "moreInfo("+item.index+");", true);
		tableSyntax += hrOption;
	}
	if(item!=null && item.presentInSheet){
		if(!is2D && item.state >= 0){
			tableSyntax += getOption(iContextMenuFit, "workTable.getItem("+item.index+").fit();", (item.state>0 && !item.table.block_fit));
			if(item.state==1){
				tableSyntax += getOption(iContextMenuHide, "workTable.getItem("+item.index+").show(false);", true);
			}else{
				tableSyntax += getOption(iContextMenuShow, "workTable.getItem("+item.index+").show(true);", true);
			}
		}
		if(item.selected){
			tableSyntax += getOption(iContextMenuUnselect, "workTable.getItem("+item.index+").select(false);", true);
		}else{
			tableSyntax += getOption(iContextMenuSelect, "workTable.getItem("+item.index+").select(true);", true);
		}
		tableSyntax += hrOption;
	}
	if(item!=null && (is2D || item.state>=-1)){
		var vs = rightViews;
		var jumps = [];
		for(var i=0; i<vs.length; i++){
			if(!vs[i].hidden){
				var v = vs[i];
				for(var j=0; j<v.items.length; j++){
					if(v.items[j]==item.index){
						jumps.push(v);
						break;
					}
				}
			}
		}
		if(!workTable._checkUnusedItem(item)){
			if(jumps.length>0){
				var mainview = ipc_data.dplist[item.index].mainview;
				for(var i=0; i<jumps.length; i++){
					var descr = iContextMenuGotoViewPrefix+" "+_cut_sheet_description(jumps[i].description);
					if(jumps[i].id==mainview){
						descr = "<b>"+descr+"</b>";
					}
					if(jumps[i].id==current_view){
						tableSyntax += getOption(descr+" "+iContextMenuActiveViewMark, "", false);
					}else{
						tableSyntax += getOption(descr, "activateView(\""+jumps[i].id+"\");", true);
					}
				}
				tableSyntax += hrOption;
			}
		}
	}
	if(item!=null){
		var links = ipc_data.dplist[item.index].links;
		if(links.length>0){
			for(var i=0; i<links.length; i++){
				tableSyntax += getOption(links[i].description, "openLink(\""+links[i].href+"\");", true);
			}
			tableSyntax += hrOption;
		}
	}
	if(iContextAddSelectedToBasket!=""){
		tableSyntax += getOption(iContextAddSelectedToBasket, "addSelectedToCart();", (selectedItms.length>0));
		tableSyntax += hrOption;
	}
	if(!is2D){
		tableSyntax += getOption(iContextMenuShowAll, "workTable.showAll();", (workTable.hiddenItems.length>0));
		tableSyntax += hrOption;
	}
	if(in3D){
		tableSyntax += getOption(iContextMenuCortonaProperties, "ipcApi.showCortonaProperties();", true);
	}
	if(typeof(iContextMenuAbout) != 'undefined'){
		tableSyntax += getOption(iContextMenuAbout, "setTimeout(\"showAbout();\",0);", true);
	}
	tableSyntax += "</table></div></div></a>";
	this.isOver3D = in3D;
	if(this.isOver3D && !isMSIE)ipcApi.enableNavigation(false);
	this.oContextHTML.style.width="";
	this.oContextHTML.style.height="";
	this.oContextHTML.innerHTML=tableSyntax;
	var wW=this.oContextHTML.clientWidth;
	var wH=this.oContextHTML.clientHeight;
	var crtW = document.body.offsetWidth;
	var crtH = document.body.offsetHeight;
	var pos = getPosition(coordElement);
	var crtL = pos.left;
	var crtT = pos.top;
	var mrgn = 2;
	var x = (ax+wW+mrgn<crtW)? ax+crtL+mrgn: ax+crtL-mrgn-wW;
	var dH = crtT+5;
	var y = (ay+wH+mrgn+dH<crtH)? ay+crtT+mrgn: ay+crtT-mrgn-wH;
	this.oContextHTML.style.left=x+"px";
	this.oContextHTML.style.top=y+"px";
	this.coords = [x, y, x+wW, y+wH];
	this.oContextHTML.innerHTML = '<IFRAME id="ifr_cmenu" style="Z-INDEX: 1001; VISIBILITY: visible; WIDTH: '+wW+'px; HEIGHT: '+wH+'px; POSITION: absolute; LEFT: 0; TOP: 0;" src="about:blank" frameSpacing="0" frameBorder="no" scrolling="no"></IFRAME><DIV id="innerDiv_cmenu" style="DISPLAY: block; Z-INDEX: 1002; LEFT: 0px; TOP: 0px; VISIBILITY: visible; OVERFLOW: visible; WIDTH: '+wW+'px; HEIGHT: '+wH+'px; POSITION: absolute; border:0;">'+this.oContextHTML.innerHTML+'</DIV>';
	startRefresher(1);
	document.getElementById('cmenu_anchor').hideFocus = true;
	document.getElementById('cmenu_anchor').focus();
	this.isOpen = true;
}
function ContextMenu_close(){
	if(this.isOpen){
		this.isOpen = false;
		stopRefresher(1);
		this.oContextHTML.innerHTML = "";
		this.oContextHTML.style.left="0";
		this.oContextHTML.style.top="0";
		this.oContextHTML.style.width="0";
		this.oContextHTML.style.height="0";
		if(this.isOver3D && !isMSIE)ipcApi.enableNavigation(true);
		workTable._onContextMenuClose();
	}
}
function ContextMenu_checkIsOpen(){
	return this.isOpen;
}

function ContextMenu_checkPoint(X, Y){
	return(this.isOpen && this.coords[0]>X && this.coords[2]<X && this.coords[1]>Y && this.coords[3]<Y);
}

var iZ = 1001;
var warning_interval = null;
var isKeys = [false, false];
var isR2 = false;
function refreshZ(){
	iZ++;
	if(isKeys[0])document.getElementById('ifr1').style.zIndex = iZ;
	if(isKeys[1]){
		document.getElementById('ifr_cmenu').style.zIndex = iZ+10;
		document.getElementById('innerDiv_cmenu').style.zIndex = iZ+20;
	}
	if(iZ>900000)iZ=1001;
}
function startRefresher(n){
	isKeys[n]=true;
	if(!isMSIE && warning_interval==null)warning_interval = window.setInterval("try{refreshZ();}catch(e){}",10);
}
function stopRefresher(n){
	if(arguments.length > 0) isKeys[n]=false;
	else isKeys = [false, false];
	if(!isKeys[0] && !isKeys[1] && warning_interval!=null){
		window.clearInterval(warning_interval);
		warning_interval = null;		
	}
}

//==============================================================================
//  Service Functions
//==============================================================================
function openLink(link_href){
	workTable.contextMenuClose();
	window.location=link_href;
	var hashIndex = link_href.lastIndexOf("#");
	if(hashIndex>=0){
		setTimeout("workTable.gotoItem('"+link_href.substring(hashIndex+1)+"');", 100);
	}
}

Array.prototype.remove =
  function Array_remove(item)
  {
  	var a = new Array();
  	for(var i=0; i<this.length; i++)
  	  if(this[i]!=item)
  	  	a.push(this[i]);
  	return a;
  }

function initialize_api(data) {
	if(with3D){
	  ipcApi = new IPCApi(cortona);
	  if(!isMSIE)ipcApi.ATP=1;
	  workTable = new IPCTable(document.getElementById("mainTable"));
	  if(ipcApi.checkCortonaComponent()){
	  	  var verC3D = 7;
	  	  if(!isMSIE){
	  	  	try{verC3D = parseInt(cortona.Version);}catch(err){}
	  	  }
	  	  if(!("Version" in cortona) || verC3D<7){
	  	  	alertx(iWarningCortonaOldVersion);
	  	  }
		  workTable.on_selection_changed = on_3D_selection;
		  ipcApi.SKIP_TRANSPARENCY_THRESHOLD_LEVEL=0;
		  ipcApi.on_part_over = new Function('n', 'if(!isCalloutsMode)workTable.onOver3D(n);');
		  ipcApi.on_part_click = new Function('part', 'button', 'shift', 'X', 'Y','if(!isCalloutsMode)workTable.onClick3D(part, button, shift, X, Y);');
		  ipcApi.on_mouse_up = _onCortonaMouseUp;
		  ipcApi.on_mouse_down = _onCortonaMouseDown;
		  ipcApi.on_mouse_move = _onCortonaMouseMove;
		  ipcApi.on_reset = new Function('workTable.clearHighlight(); navControl.checkMode();');
		  ipcApi.on_simulation_load = on_simulation_load;
		  ipcApi.on_view_changed = on_view_changed;
		  ipcApi.loadMetadate(data);
		  on_set_properties(data);
		}else{
			if(isMSIE){
				document.body.style.cursor="";
				document.getElementById('loading_table').style.display = "none";
				document.getElementById('block_div').style.display = "none";
				cortona.style.display = "";
			}
			with3D = false;
			var installMessage = "";
			if(typeof(iCaptionCortonaNotFound) != 'undefined')installMessage = (isMSIE)? iCaptionCortonaNotFound: iCaptionEmbedCortonaNotFound;
			else{
				installMessage = (isMSIE)? iWarningCortonaNotFound: iWarningEmbedCortonaNotFound;
				installMessage += "<br><br><a href=\"http://www.cortona3d.com/install/\">Cortona3D Viewer</a>"
			}
			document.getElementById('cortonaContainer').innerHTML = '<table width="100%" height="100%"><tr><td align="center" valign="middle" class="errorMessage">'+installMessage+'</td></tr></table>';
			document.getElementById("bottomToolbar1Td").style.visibility = "hidden";
			document.getElementById("bottomToolbar2Td").style.visibility = "hidden";
			ipcApi = new DmmApi();
			workTable = new IPCTable(document.getElementById("mainTable"));
			on_simulation_load(true);
		}
	}else{
		set2D(true);
		ipcApi = new DmmApi();
	  workTable = new IPCTable(document.getElementById("mainTable"));
	  if(isChrome){
	  	setTimeout("on_simulation_load(true)", 100);
	  }else{
	  	on_simulation_load(true);
	  }
	}
}

/*******
 * IPCApi Event Handlers
 */
function cortonaControl_OnSceneLoaded(bSuccess){if(ipcApi){on_cortona_scene_loaded(bSuccess);}else{setTimeout("cortonaControl_OnSceneLoaded("+bSuccess+")", 500);}}
function cortonaControl_OnSceneUnloaded(){on_cortona_scene_unloaded();}
function cortonaControl_MouseDown(Button, Shift, X, Y){on_cortona_mouse_down(Button, Shift, X, Y);}
function cortonaControl_MouseUp(Button, Shift, X, Y){on_cortona_mouse_up(Button, Shift, X, Y);}
function cortonaControl_MouseMove(Button, Shift, X, Y){if(typeof(on_cortona_mouse_move)=="function")on_cortona_mouse_move(Button, Shift, X, Y);}
function cortonaControl_OnMouseEnter(){on_cortona_mouse_enter();}
function cortonaControl_OnMouseOut(){if(typeof(on_cortona_mouse_out)=="function")on_cortona_mouse_out();}
function cortonaControl_OnKeyDown (key, shift){on_cortona_key_down(key, shift);}

var scroll_timeout = null;

function on_simulation_load(bSuccess) {
  if(bSuccess) {
  	current_view = null;
    var defaultview = "";
    if(location.hash)
    {
      var itemnbr = location.hash.substring(1);
      defaultview = getDefaultView(itemnbr);
      if(defaultview.length==0 && itemnbr.length>0 && itemnbr.charAt(0)=='0'){
      	  for(var z=0; z<itemnbr.length; z++){
	   	  		defaultview = getDefaultView(itemnbr.substr(z));
	   	  		if(defaultview.length!=0 || itemnbr.charAt(z)!='0')break;	   	  		
      	  }
      }
    }
    if(with3D){
    	if(isMSIE){
	    	document.body.style.cursor="";
			document.getElementById('loading_table').style.display = "none";
			document.getElementById('block_div').style.display = "none";
			cortona.style.display = "";
		}
	    if(defaultview.length==0)
	      defaultview = ipcApi.initialViewName;
	    ipcApi.setIPCView(defaultview);
    }else{
    	if(defaultview.length==0 && rightViews.length>0)defaultview = rightViews[0].id;
    	if(defaultview.length!=0)on_view_changed(defaultview);
    }
  }
  else {
    alertx(iWarningErrorOnVRMLLoading);
  }
}

function getDefaultView(sItem){
	var defaultview = "";
	var items = ipc_data.dplist;
      for(var i=0; i<items.length; i++)
      {
        if(items[i].itemnumber == sItem)
        {
          if(items[i].mainview)
            defaultview = items[i].mainview;
          break;
        }
      }
      if(defaultview.length==0)
      {
        var views = rightViews;
        for(var i=0; i<views.length; i++)
        {
          if(sItem in views[i].itemnbr)
          {
            defaultview = views[i].id;
            break;
          }
        }
      }
      if(defaultview.length>0)preSelectedItem=sItem;
      return defaultview;
}

var last_view = null;
var current_view = null;
var current_view_timeout = null;
var view_description = "";
var formated_rev_date = "MMM DD/YY";

function on_view_changed(sViewName) {
  var vName = "";
  for(var i=0; i<document.getElementById("viewsSelector").options.length; i++){
  	if(document.getElementById("viewsSelector").options[i].value==sViewName){
		document.getElementById("viewsSelector").selectedIndex=i;
		view_description = iViewNamePrefix+" "+views_descriptions[i];
		vName = views_descriptions[i];
		break;
	}
  }
  current_view = sViewName;
  last_view = current_view;
  var vs = rightViews;
	var sheet_items = {};
	for(var i=0; i<vs.length; i++){
		if(vs[i].id==current_view){
			document.getElementById("revision_mark").style.visibility = (vs[i].changed)? "visible": "hidden";
		}
	}
  clearTimeout(current_view_timeout);
  if(specType!="GENERIC"){
  	if(specType!="ITEM")document.getElementById("metasheet0")[sInnerText] = view_description;
  	document.getElementById("metasheet")[sInnerText] = view_description;
	}
  resize_container();
  ipcApi.activatePageViewpoint();
  workTable.update();
  document.getElementById("divContainer").style.visibility = "visible";
  load_2D_graphics(getCGM(vName));
  disableViews(false);
  workTable.setBlock(false);
  if(preSelectedItem!=""){
  	workTable.onClick2D(preSelectedItem, 0);
  	preSelectedItem = "";
  }
}

/************
 * HTML Event handlers
 */
function on_doc_load(){
	isMSIE=(navigator.appName=="Microsoft Internet Explorer");
	if(!isMSIE){
		sInnerText="textContent";
		isOpera=(navigator.appName.toLowerCase()=="opera");
		if(!isOpera){
			isFF = (navigator.userAgent.toLowerCase().lastIndexOf("firefox")>0);
			if(!isFF){
				isChrome = (navigator.userAgent.toLowerCase().lastIndexOf("chrome")>0);
				if(isChrome)document.getElementById("leftSideTD").style.display = "table-cell";
			}
		}
	}
	cortona = document.getElementById('cortonaControl');
	
	with3D = (typeof(IPCApi)=="function");
	with2D = is2DGraphicsEnabled;
	correctCollumnsWidth();
	window.onresize = resize_container;
	resize_container();
	window.document.onkeydown=CloseContextMenu;
	window.onblur = CloseContextMenu;
	window.onbeforeprint = fBeforePrint;
	window.onafterprint = fAfterPrint;
	embed3DControl();
	if(typeof(fullTableOnlyRowColor) != 'undefined')fullTableRowColor = fullTableOnlyRowColor;
	if(typeof(viewer2DType) != 'undefined')viewer2D = viewer2DType;
	embed2DControl();
	on_after_embed();
}
function on_after_embed(){
	if(isMSIE){
		on_after_embed0();
	}else{
		setTimeout("on_after_embed0()", 0);
	}
}
function on_after_embed0(){
	presetHtml(ipc_data);
	disableViews(true);
	_initialize_views();
	initialize_api(ipc_data);
}

function on_doc_unload(){
	if(with3D){
		if(ipcApi!=null){
			ipcApi._unadvise_control_script_events();
		}
		if(isMSIE){
		for(var field in cortona){
			try{
				if(typeof(cortona[field]) == 'function'){
					cortona[field] = null;
				}
			}catch(e){}
		}
		}
	}
}


function cortona_fire_event(event2name, args){
	if(cortona && event2name in cortona && typeof(cortona[event2name]) == 'function'){
		void cortona[event2name].apply(cortona, args);
		return true;
	}
	return false;
}
function on_cortona_scene_loaded(success){
if(!cortona_fire_event('on_scene_loaded', arguments)){
	setTimeout("on_cortona_scene_loaded("+success+");", 500);
}
}
function on_cortona_scene_unloaded(){try{cortona_fire_event('on_scene_unloaded', arguments);}catch(e){}}
function on_cortona_mouse_down(Button, Shift, X, Y){
	cortona_fire_event('on_mouse_down', arguments);
	if(Button==1)SmartCloseContextMenu(X,Y);
	else CloseContextMenu(X,Y);
}
function on_cortona_mouse_up(Button, Shift, X, Y){cortona_fire_event('on_mouse_up', arguments);}
function on_cortona_mouse_move(Button, Shift, X, Y){cortona_fire_event('on_mouse_move', arguments);}
function on_cortona_mouse_out(){cortona_fire_event('on_mouse_out', arguments);}
function on_cortona_mouse_enter(){}
function on_cortona_key_down(key, shift){}


/************
 * Stuff
 */
var tooltipStructure = new Array();
var baseItemField = null;

function _getSingleValue(name, valuesArray){
	for(var i=0; i<valuesArray.length; i++){
		if(valuesArray[i].name==name){
			return valuesArray[i].value;
		}
	}
	return null;
}

var divContainerCSS = null;
function resize_container(){
	if(!isMSIE){
		if(divContainerCSS==null)divContainerCSS = getCSSRule("screen", "#divContainer");
		if(divContainerCSS!=null)divContainerCSS.style.height=Math.floor(document.body.clientHeight - document.getElementById('moreOptions').clientHeight - document.getElementById('mainHeader').clientHeight)+"px";
	}
	CloseContextMenu();
}

function _getFormatedDate(eeeemmdd){
	var fdate = "";
	try{
		if(eeeemmdd.length == 8){
			var e = eeeemmdd.substr(0,4);
			var m = eeeemmdd.substr(4,2);
			var d = eeeemmdd.substr(6,2);
			fdate = ""+e+"-"+m+"-"+d;
		}
	}catch(e){}
	if(dateFormat=="ATA"){
		try{
			if(eeeemmdd.length == 8){
				var e = eeeemmdd.substr(2,2);
				var m = eeeemmdd.substr(4,2);
				var d = eeeemmdd.substr(6,2);
				fdate = iMonths[parseInt(m,10)-1]+" "+d+"/"+e;
			}
		}catch(e){}
	}
	return fdate;
}

function presetHtml(data) {
	document.getElementById("leftSideTD").onresize = onTdSelectionresize;
	document.getElementById("btn_2d").style.display = (with3D && with2D)? '': 'none';
	document.getElementById("chbxShowBoxes").disabled = (is2D);
	document.getElementById("chkFullTable").checked = false;
	document.getElementById("chbxShowBoxes").checked = true;
	if(!isMSIE){
		disableButton("btnFitSelection", true);
		disableButton("btnShowSelection", true);
		disableButton("btnHideSelection", true);
		document.getElementById("ScrollSliderCaption").style.visibility="hidden";
		document.getElementById("ScrollSlider").style.visibility="hidden";
	}
	if(!isMSIE || ((typeof(isDisableTableExport) != 'undefined') && isDisableTableExport))document.getElementById("btn_excel").style.display = "none";
	if(!isMSIE)document.getElementById("btn_composite_print").style.display = "none";

	if(specType=="S1000D"){
		formated_rev_date = _getFormatedDate(M_REVDATE);
		if(M_MODEL!=""){
			document.getElementById("meta_model").innerHTML = iModelNamePrefix+" "+M_MODEL;
			document.getElementById("meta_model0").innerHTML = iModelNamePrefix+" "+M_MODEL;
		}
		document.getElementById("meta_date").innerHTML = formated_rev_date;
		document.getElementById("meta_date0").innerHTML = formated_rev_date;
		if(M_TSN!="" && M_TSN!="."){
			document.getElementById("meta_revnumber").innerHTML = iRevisionNamePrefix+" "+M_TSN;
			document.getElementById("meta_revnumber0").innerHTML = iRevisionNamePrefix+" "+M_TSN;
		}
	}else if(specType=="ATA"){
		formated_rev_date = _getFormatedDate(M_REVDATE);
		if(M_ENGINEMODEL!=""){
			document.getElementById("metamodel0")[sInnerText] = iModelNamePrefix+" "+M_ENGINEMODEL;
			document.getElementById("metamodel")[sInnerText] = iModelNamePrefix+" "+M_ENGINEMODEL;
		}
		document.getElementById("revDate0")[sInnerText] = formated_rev_date;
		document.getElementById("revDate")[sInnerText] = formated_rev_date;
	}else if(specType=="ITEM"){
		formated_rev_date = _getFormatedDate(M_REVDATE);
		document.getElementById("revDate")[sInnerText] = formated_rev_date;
	}else if(specType=="GENERIC"){
		try{
			formated_rev_date = iPublishedDatePrefix+_getFormatedDate(PUBLISH_DATE);
			document.getElementById("metaPublishedDate0")[sInnerText] = formated_rev_date;
			document.getElementById("metaPublishedDate")[sInnerText] = formated_rev_date;
		}catch(e){}
	}
	document.getElementById("meta_currentdate").innerHTML = iPrintTableFooterPrinted+_getFormatedDate(GetCurrentDate());
	topControl = new TopLineControl();
	if(with3D){
		navControl = new NavigationControl();
		try{
			C_YELLOW = new Array(parseInt("0x"+clr3DSelectedColor.substr(1,2), 16)/255.0, parseInt("0x"+clr3DSelectedColor.substr(3,2))/255.0, parseInt("0x"+clr3DSelectedColor.substr(5,2))/255.0);
		}catch(e){};
		tSlider = document.getElementById("ScrollSlider");
		if(!isMSIE)tSlider.style.height="";
	}
	var dpl = ipc_data.dplist;
	var fnd = {};
	for(var i=0; i<dpl.length; i++){
		var usg = dpl[i].filter.usage;
		for(var g=0; g<usg.length; g++){
			if(!(usg[g] in fnd)){
				fnd[usg[g]]=1;
				usageList.push(usg[g]);
			}
		}
	}
	usageList.sort();
	for(var i=0; i<usageList.length; i++){
		var oOption = document.createElement("OPTION");
		oOption.text=usageList[i];
		oOption.value=usageList[i];
		if(isMSIE)document.getElementById("slctUsage").add(oOption);
			else document.getElementById("slctUsage").add(oOption, null);
	}
	fnd = {};
	for(var i=0; i<dpl.length; i++){
		var mdl = dpl[i].filter.modelapply;
		for(var g=0; g<mdl.length; g++){
			if(!(mdl[g] in fnd)){
				fnd[mdl[g]]=1;
				modelsList.push(mdl[g]);
			}
		}
	}
	modelsList.sort();
	for(var i=0; i<modelsList.length; i++){
		var oOption = document.createElement("OPTION");
		oOption.text=modelsList[i];
		oOption.value=modelsList[i];
		if(isMSIE)document.getElementById("slctModel").add(oOption);
			else document.getElementById("slctModel").add(oOption, null);
	}
	fnd = {};
	for(var i=0; i<dpl.length; i++){
		var sb = dpl[i].filter.sb;
		for(var g=0; g<sb.length; g++){
			if(!(sb[g] in fnd)){
				fnd[sb[g]]=1;
				sbList.push(sb[g]);
			}
		}
	}
	sbList.sort();
	for(var i=0; i<sbList.length; i++){
		var oOption = document.createElement("OPTION");
		oOption.text=sbList[i];
		oOption.value=sbList[i];
		if(isMSIE)document.getElementById("slctSB").add(oOption);
			else document.getElementById("slctSB").add(oOption, null);
	}
	document.getElementById("slctUsage").onchange = new Function('document.getElementById("slctSB").selectedIndex=0; workTable.filter(document.getElementById("slctModel").selectedIndex, document.getElementById("slctUsage").selectedIndex, document.getElementById("slctSB").selectedIndex);');
	document.getElementById("slctModel").onchange = new Function('document.getElementById("slctSB").selectedIndex=0; workTable.filter(document.getElementById("slctModel").selectedIndex, document.getElementById("slctUsage").selectedIndex, document.getElementById("slctSB").selectedIndex);');
	document.getElementById("slctSB").onchange = new Function('document.getElementById("slctModel").selectedIndex=0; document.getElementById("slctUsage").selectedIndex=0; workTable.filter(document.getElementById("slctModel").selectedIndex, document.getElementById("slctUsage").selectedIndex, document.getElementById("slctSB").selectedIndex);');
}
var views_descriptions = new Array();
var rightViews = [];
function  _initialize_views() {
  var oOption;
  rightViews = [];
  var vs = ipc_data.views;
  var idents = [];
  for(var i=0; i<vs.length; i++){
	idents[i] = "";
  }
  if(typeof(sheetIdentSymbol) != 'undefined' && sheetIdentSymbol != ""){
	  var parents = {};
	  for(var i=0; i<vs.length; i++){
	  	  var trs = vs[i].transitions;
	  	  for(var j=0; j<trs.length; j++){
	  	  	parents[trs[j].id]=vs[i];
	  	  }
	  }
	  for(var i=0; i<vs.length; i++){
	  	  var idnt = "";
	  	  var pid = vs[i].id;
	  	  var z = 0;
	  	  while(pid in parents){
	  	  	if(!parents[pid].hidden)idnt+=sheetIdentSymbol;
	  	  	pid = parents[pid].id;
	  	  	if(z++>100){
	  	  		idnt = 0;
	  	  		break;
	  	  	}
	  	  }
	  	  idents[i] = idnt;
	  }
  }
	for(var i=0; i<vs.length; i++){
		if(!vs[i].hidden){
			if(with3D || !with2D || vs[i].cgmsrc){
				rightViews.push(vs[i]);
		 		oOption = document.createElement("OPTION");
				oOption.text = _cut_sheet_description(idents[i]+vs[i].description);
				oOption.title = vs[i].description;
				oOption.value = vs[i].id;
				if(isMSIE)document.getElementById("viewsSelector").add(oOption);
					else document.getElementById("viewsSelector").add(oOption, null);
				views_descriptions.push(vs[i].description);
				if(vs[i].changed)document.getElementById("revision_mark").style.display = "";
			}
		}
	}
  document.getElementById("viewsSelector").selectedIndex=0;
}

function _cut_sheet_description(sDescription){
	if(sDescription.length>30){
		return sDescription.substr(0,27)+"...";
	}else{
		return sDescription;
	}
}

function on_set_properties(data){
	if(with3D){
		var axesfile = _getSingleValue("AxesFile", data.media);
		if(axesfile!=null) ipcApi.set_axes_file(axesfile);
		var skin = _getSingleValue("Skin", data.media);
		if(skin != null) ipcApi.setCortonaSkin(skin);
	}
}

function activateView(viewName){
	if(viewName != null){
		workTable.setFullTable(false);
		enableCallouts(false);
		document.getElementById("chkFullTable").checked = false;
		disableViews(true);
		workTable.reset();
		document.getElementById("slctUsage").selectedIndex=0;
		document.getElementById("slctModel").selectedIndex=0;
		document.getElementById("slctSB").selectedIndex=0;
		workTable.setBlock(true);
		last_view=viewName;
		if(with3D){
			if(skip_animation || is2D)
				ipcApi.setIPCView(viewName);
			else
				ipcApi.gotoIPCView(viewName);
		}else{
			on_view_changed(viewName);
		}
	}
}
function disableViews(flag){
	try{
		document.getElementById("viewsSelector").disabled = flag;
		document.getElementById("chkFullTable").disabled = flag;
		document.getElementById("slctUsage").disabled = flag;
		document.getElementById("slctModel").disabled = flag;
		document.getElementById("slctSB").disabled = flag;
		topControl.blocked = flag;
	}catch(e){}
	resize_container();
}

function selectView(n){
 if(document.getElementById("viewsSelector").options.length > n){
 	activateView(document.getElementById("viewsSelector").options[n].value);
 }
}
function GetCurrentDate(){
   var d = new Date();
   var s = "";
   s += d.getFullYear();
   if(d.getMonth()<9) s +="0";
   s += (d.getMonth()+1);
   if(d.getDate()<10) s +="0";
   s += d.getDate();
   return(s);
}

function print3D(){
	if(!is2D){
	if(with3D){
		var isPHS = (typeof(iPrint3DHeaderStyle) != 'undefined');
		var isPFS = (typeof(iPrint3DFooterStyle) != 'undefined');
		if(isPHS)ipcApi.setPrintHeaderStyle(iPrint3DHeaderStyle);
		if(isPFS)ipcApi.setPrintFooterStyle(iPrint3DFooterStyle);
		if(specType=="S1000D"){
			var dscr = view_description;
			if(view_description.length>65)dscr = dscr.substr(0,64);
			if(!isPHS)ipcApi.setPrintHeaderStyle(["normal", "normal", "6", "Tahoma", "1", "solid"]);
			ipcApi.setPrintHeader(iPrint3DHeaderTitle+M_CSN+"   "+iFigureNamePrefix+" "+M_FIGURE+"   "+iRevisionNamePrefix+" "+M_TSN+"  "+formated_rev_date+"&b&b"+dscr);
			if(!isPFS)ipcApi.setPrintFooterStyle(["normal", "normal", "7", "Tahoma", "1", "solid"]);
		}else if(specType=="ATA"){
			var sheet_title = view_description;
			var fig_title = M_TITLE;
			var mdl = "";
			if(M_ENGINEMODEL!="") mdl = iModelNamePrefix+" "+M_ENGINEMODEL;
			if(sheet_title.length>70)sheet_title = sheet_title.substr(0,68)+"...";
			if(fig_title.length>70)fig_title = fig_title.substr(0,68)+"...";
			if(!isPHS)ipcApi.setPrintHeaderStyle(["normal", "normal", "7.5", "Tahoma", "1", "solid"]);
			ipcApi.setPrintHeader(iPrint3DHeaderTitle+M_CSN+"  "+iFigureNamePrefix+" "+M_FIGURE+"&b&b"+iRevisionNamePrefix+" "+M_TSN+"\n"+fig_title+"&b&b"+formated_rev_date+"\n"+sheet_title+"&b&b"+mdl);
			if(!isPFS)ipcApi.setPrintFooterStyle(["normal", "normal", "7.5", "Tahoma", "1", "solid"]);
			var footerText = "";
			var ar1 = iPrint3DFooterProprietary.split("\n");
			var ar2 = (iPrint3DFooterPrinted+_getFormatedDate(GetCurrentDate())).split("\n");
			var nStr = Math.max(ar1.length , ar2.length);
			for(var i=0; i<nStr; i++){
				if(ar1.length>i)footerText+=ar1[i];
				if(ar2.length>i)footerText+="&b&b"+ar2[i];
				footerText+="\n";
			}
		}else if(specType=="ITEM"){
			var sheet_title = view_description;
			var fig_title = M_TITLE;
			if(sheet_title.length>70)sheet_title = sheet_title.substr(0,68)+"...";
			if(fig_title.length>70)fig_title = fig_title.substr(0,68)+"...";
			if(!isPHS)ipcApi.setPrintHeaderStyle(["normal", "normal", "7.5", "Tahoma", "1", "solid"]);
			ipcApi.setPrintHeader(iPrint3DHeaderTitle+M_TOOLNBR+"&b&b"+iRevisionNamePrefix+" "+M_TSN+"\n"+fig_title+"&b&b"+formated_rev_date+"\n"+sheet_title);
			if(!isPFS)ipcApi.setPrintFooterStyle(["normal", "normal", "7.5", "Tahoma", "1", "solid"]);
			var footerText = "";
			var ar1 = iPrint3DFooterProprietary.split("\n");
			var ar2 = (iPrint3DFooterPrinted+_getFormatedDate(GetCurrentDate())).split("\n");
			var nStr = Math.max(ar1.length , ar2.length);
			for(var i=0; i<nStr; i++){
				if(ar1.length>i)footerText+=ar1[i];
				if(ar2.length>i)footerText+="&b&b"+ar2[i];
				footerText+="\n";
			}
		}else if(specType=="GENERIC"){
			var dscr = view_description;
			if(view_description.length>65)dscr = dscr.substr(0,64);
			if(!isPHS)ipcApi.setPrintHeaderStyle(["normal", "normal", "8", "Tahoma", "1", "solid"]);
			ipcApi.setPrintHeader(iPrint3DHeaderTitle+M_TITLE);
			if(!isPFS)ipcApi.setPrintFooterStyle(["normal", "normal", "8", "Tahoma", "1", "solid"]);
		}
		ipcApi.setPrintFooter(preparePrintFooter(iPrint3DFooterProprietary, iPrint3DFooterPrinted+_getFormatedDate(GetCurrentDate())));
		ipcApi.print3D();
	}
	}else{
		print2D();
	}
}
function preparePrintFooter(s1, s2){
	var footerText = "";
	var ar1 = s1.split("\n");
	var ar2 = s2.split("\n");
	var nStr = Math.max(ar1.length , ar2.length);
	for(var i=0; i<nStr; i++){
		if(ar1.length>i)footerText+=ar1[i];
		if(ar2.length>i)footerText+="&b&b"+ar2[i];
		footerText+="\n";
	}
	return footerText;
}
function printTable(){
	document.getElementById("meta_currentdate").innerHTML = iPrintTableFooterPrinted+_getFormatedDate(GetCurrentDate());
	var isPHH = (typeof(iPrintHeaderHtml) != 'undefined');
	var isPFH = (typeof(iPrintFooterHtml) != 'undefined');
	var isPrinted = false;
	if(isMSIE && (isPHH || isPFH)){
		var pObj = {};
		if(isPHH)pObj.headerHtml = iPrintHeaderHtml;
		if(isPFH)pObj.footerHtml = iPrintFooterHtml;
	  document.__printerOverride = pObj;
		try{
			var fusain = new ActiveXObject("CarbonCopy.IeFusain");
			fusain.print(document);
			isPrinted = true;
		}catch(e){}
	}
	if(!isPrinted){
		window.print();
	}
}

function setFullTable(bFlag){
	workTable.setFullTable(bFlag);
}

function hideTable(flag){
	document.getElementById("MainTableTd").style.display = (flag)? 'none': '';
	setTimeout("gohome_iso();", 200);
}
function setIgnoreTransp(flag){
	ipcApi.SKIP_TRANSPARENCY_THRESHOLD_LEVEL = (flag)? 0: 0.95;
}

var topControl;
function TopLineControl(){
	this.blocked = true;
	this.buttonsNames = ["btn_3donly", "btn_skipanimation", "btn_ignoretransp", "btn_help", "btn_print_3d", "btn_print_table", "btn_reset", "btn_excel", "btn_callouts", "btn_2d", "btn_composite_print", "btn_basket"];
	this.btns =new Array();
	for(var i=0; i<this.buttonsNames.length; i++){
		var btn = document.getElementById(this.buttonsNames[i]);
		if(btn){
		this.btns.push({span:btn, state:0, pressed:false, over:false});
		btn.onclick = new Function('topControl.onBtnClick('+i+');');
		btn.onmouseover = new Function('topControl.onBtnOver('+i+');');
		btn.onmouseout = new Function('topControl.onBtnOut('+i+');');
		btn.onmousedown = new Function('topControl.onMouseDown('+i+');');
		btn.onmouseup = new Function('topControl.onMouseUp('+i+');');
		if(!isMSIE){
			btn.style.MozUserSelect="none";
			btn.style.webkitUserSelect="none";
		}
		}
	}
	this.btns[2].state=1;
	this.btns[2].span.style.backgroundPosition = "-50px 0";
}

TopLineControl.prototype.onBtnClick = TopLineControl_onBtnClick;
TopLineControl.prototype.onBtnOver = TopLineControl_onBtnOver;
TopLineControl.prototype.onBtnOut = TopLineControl_onBtnOut;
TopLineControl.prototype.onMouseDown = TopLineControl_onMouseDown;
TopLineControl.prototype.onMouseUp = TopLineControl_onMouseUp;
TopLineControl.prototype.setState = TopLineControl_setState;

function TopLineControl_setState(n, state){
	this.btns[n].state=state;
	this.btns[n].span.style.backgroundPosition = (state==1)? "-50px 0" : ((this.btns[n].over)? "-25px 0" : "0 0");
}
function TopLineControl_onMouseDown(n){
	if(this.blocked && n!=3)return;
	this.btns[n].pressed = true;
	this.btns[n].span.style.backgroundPosition = "-50px 0";
}
function TopLineControl_onMouseUp(n){
	if(this.blocked && n!=3)return;
	if(this.btns[n].state==0){
		this.btns[n].span.style.backgroundPosition = (this.btns[n].over)? "-25px 0" : "0 0";
	}
	this.btns[n].pressed = false;
}
function TopLineControl_onBtnClick(n){
	if(this.blocked && n!=3)return;
	if(n<3 || n==8 || n==9){
		if(this.btns[n].state==0){
			this.btns[n].state=1;
			this.btns[n].span.style.backgroundPosition = "-50px 0";
		}else{
			this.btns[n].state=0;
			this.btns[n].span.style.backgroundPosition = "-25px 0";
		}
	}
	if(n==0){
		hideTable(this.btns[n].state==1);
	}else if(n==1){
		skip_animation = (this.btns[n].state==1)
	}else if(n==2){
		setIgnoreTransp(this.btns[n].state==1);
	}else if(n==3){
		showHelp();
	}else if(n==4){
		print3D();
	}else if(n==5){
		printTable();
	}else if(n==6){
		activateView(last_view);
	}else if(n==7){
		workTable.toExcel();
	}else if(n==8){
		enableCallouts(this.btns[n].state==1);
	}else if(n==9){
		set2D(this.btns[n].state==1);
	}else if(n==10){
		compositePrint();
	}else if(n==11){
		showCart();
	}
}
function TopLineControl_onBtnOver(n){
	if(this.blocked && n!=3)return;
	this.btns[n].over = true;
	if(this.btns[n].state==0){
		this.btns[n].span.style.backgroundPosition = (this.btns[n].pressed)? "-50px 0" : "-25px 0";
	}
}
function TopLineControl_onBtnOut(n){
	if(this.blocked && n!=3)return;
	this.btns[n].over = false;
	if(this.btns[n].state==0){
		this.btns[n].span.style.backgroundPosition = "0 0";
	}
}

var navControl;

function NavigationControl(){
	this.buttonsNames = ["btnSpin", "btnZoom", "btnPan", "btnCenter", "btnFit", "btnCMark", "btnV1", "btnV2", "btnV3", "btnV4", "btnV5", "btnV6", "btnV7"];
	this.modes = ["spin", "zoom", "pan", "goto"];
	this.sviews = ["front", "back", "left", "right", "top", "bottom", "isometric"];
	this.btns =new Array();
	for(var i=0; i<this.buttonsNames.length; i++){
		var btn = document.getElementById(this.buttonsNames[i]);
		if(btn){
		this.btns.push({span:btn, state:0, pressed:false, over:false});
		btn.onclick = new Function('navControl.onBtnClick('+i+');');
		btn.onmouseover = new Function('navControl.onBtnOver('+i+');');
		btn.onmouseout = new Function('navControl.onBtnOut('+i+');');
		btn.onmousedown = new Function('navControl.onMouseDown('+i+');');
		btn.onmouseup = new Function('navControl.onMouseUp('+i+');');
		if(!isMSIE){
			btn.style.MozUserSelect="none";
			btn.style.webkitUserSelect="none";
		}
		}
	}
	this.currentMode = 0;
	this.btns[0].state=1;
	this.btns[0].span.style.backgroundPosition = "-64px 0";
	this.btns[5].state=1;
	this.btns[5].span.style.backgroundPosition = "-64px 0";
}

NavigationControl.prototype.onBtnClick = NavigationControl_onBtnClick;
NavigationControl.prototype.onBtnOver = NavigationControl_onBtnOver;
NavigationControl.prototype.onBtnOut = NavigationControl_onBtnOut;
NavigationControl.prototype.checkMode = NavigationControl_checkMode;
NavigationControl.prototype.onMouseDown = NavigationControl_onMouseDown;
NavigationControl.prototype.onMouseUp = NavigationControl_onMouseUp;

function NavigationControl_onMouseDown(n){
	this.btns[n].pressed = true;
	if(this.btns[n].over){
		this.btns[n].span.style.backgroundPosition = (n<6)? "-64px 0" : "-44px 0";
	}else{
		this.btns[n].span.style.backgroundPosition = "0 0";
	}
}
function NavigationControl_onMouseUp(n){
	if(this.btns[n].state==0){
		this.btns[n].span.style.backgroundPosition = (n<6)? "-32px 0" : "-22px 0";
	}
	this.btns[n].pressed = false;
}

function NavigationControl_onBtnClick(n){
	if(n<4){
		if(this.btns[n].state==0){
			this.btns[n].state=1;
			this.btns[n].span.style.backgroundPosition = "-64px 0";
			ipcApi.setNavigationStyle(this.modes[n]);
			for(var i=0; i<this.modes.length; i++){
				if(n!=i){
					this.btns[i].state=0;
					this.btns[i].span.style.backgroundPosition = "0 0";
				}
			}
		}else if(n==3){
			this.onBtnClick(0);
		}
	}else if(n==4){
		ipcApi.fitToViewParts();
	}else if(n==5){
		if(this.btns[n].state==0){
			this.btns[n].state=1;
			ipcApi.set_ui_centerpoint(true);
			this.btns[n].span.style.backgroundPosition = "-64px 0";
		}else{
			this.btns[n].state=0;
			ipcApi.set_ui_centerpoint(false);
			this.btns[n].span.style.backgroundPosition = "0 0";
		}
	}else{
		ipcApi.fitToViewParts(this.sviews[n-6]);
	}
}
function NavigationControl_onBtnOver(n){
	this.btns[n].over = true;
	if(this.btns[n].state==0){
		if(this.btns[n].pressed){
			this.btns[n].span.style.backgroundPosition = (n<6)? "-64px 0" : "-44px 0";
		}else{
			this.btns[n].span.style.backgroundPosition = (n<6)? "-32px 0" : "-22px 0";
		}
	}
}
function NavigationControl_onBtnOut(n){
	this.btns[n].over = false;
	if(this.btns[n].state==0){
		this.btns[n].span.style.backgroundPosition = "0 0";
	}
}
function NavigationControl_checkMode(){
	if(ipcApi.getNavigationStyle()!=this.modes[3]){
		for(var i=0; i<this.modes.length; i++){
			if(ipcApi.getNavigationStyle()==this.modes[i]){
				this.onBtnClick(i);
				return;
			}
		}
	}
}

var selectedItms = [];
var selected3DItems = [];
var tSlider = null;
var is_tSliderActive = false;

function on_3D_selection(selectedItems){
	selectedItms=selectedItems;
	if(selectedItems.length>0){
		document.getElementById("txtCalloutCaption").value=selectedItems[selectedItems.length-1].getItemNumber();
	}else{
		document.getElementById("txtCalloutCaption").value="";
	}
	selected3DItems = new Array();
	for(var i=0; i<this.selectedItems.length; i++){
		if(this.selectedItems[i].state>=0 && this.selectedItems[i].presentInSheet){
			selected3DItems.push(this.selectedItems[i]);
		}
	}
	var isDisabled = (selected3DItems.length==0);
	document.getElementById("td3DSelection").disabled=isDisabled;
	if(!isMSIE){
		document.getElementById("ScrollSliderCaption").style.visibility=(isDisabled)? "hidden" : "visible";
		document.getElementById("ScrollSlider").style.visibility=(isDisabled)? "hidden" : "visible";
	}
	disableButton("btnFitSelection", (isDisabled || isCalloutsMode));
	disableButton("btnShowSelection", isDisabled);
	disableButton("btnHideSelection", isDisabled);
	if(selected3DItems.length>0){
		is_tSliderActive = false;
		tSlider.scrollLeft = selected3DItems[0].getTransparency()*(tSlider.scrollWidth - tSlider.offsetWidth)/0.85;
	}
}
function fit_3D_selection(){
	if(selected3DItems.length>0)workTable.fitToItems(selected3DItems);
}
function hide_3D_selection(){
	if(!isMSIE)ipcApi.setAutoRefreshOff();
	for(var i=0; i<selected3DItems.length; i++){
		selected3DItems[i].show(false);
	}
	if(!isMSIE)ipcApi.setAutoRefreshOn();
}
function show_3D_selection(){
	if(!isMSIE)ipcApi.setAutoRefreshOff();
	for(var i=0; i<selected3DItems.length; i++){
		selected3DItems[i].show(true);
	}
	if(!isMSIE)ipcApi.setAutoRefreshOn();
}

function set_transparency_3D_selection(){
	if(is_tSliderActive){
		var transpValue;
		if(tSlider.scrollWidth == tSlider.offsetWidth){
			transpValue = 0.85 * tSlider.scrollLeft/1080;
		}else{
			transpValue = 0.85 * tSlider.scrollLeft/(tSlider.scrollWidth - tSlider.offsetWidth);
		}
		
		if(!isMSIE)ipcApi.setAutoRefreshOff();
		for(var i=0; i<selected3DItems.length; i++){
			selected3DItems[i].setTransparency(transpValue);
		}
		if(!isMSIE)ipcApi.setAutoRefreshOn();
	}
}

var helpWindow = null;
function showHelp(){
	try{
		helpWindow.close();
	}catch(e){}
	if(isMSIE){
		helpWindow = window.showModelessDialog(resFolder+helpFile,"","dialogWidth:750px; dialogHeight:600px; resizable:Yes; help: No; scroll:yes; status:no;");
	}else{
		helpWindow = window.open(resFolder+helpFile,"","statusbar=no,resizable=yes,scrollbars=yes,width=750,height=600");
	}
}

var isCalloutsMode = false;
var allCallouts = new Array();
var calloutDraw = null;

function enableCallouts(bFlag){
	if(with3D){
		isCalloutsMode = bFlag;
	  ipcApi.enableNavigation(!bFlag);
	  ipcApi.clearAllCallouts();
	  calloutDraw = null;
		allCallouts = new Array();
		document.getElementById("navigation_controls_string").style.display = (!isCalloutsMode)? '': 'none';
		document.getElementById("callouts_controls_string").style.display = (isCalloutsMode)? '': 'none';
		topControl.setState(8, (isCalloutsMode)? 1: 0);
		disableButton("btnFitSelection", (selected3DItems.length==0 || isCalloutsMode));
		workTable.block_fit = isCalloutsMode;
		document.getElementById("bttmTbarTd1").onselectstart = (bFlag)? new Function("") : new Function("return false;");
	}
}

function undoCallout(){
	if(allCallouts.length>0){
		allCallouts.pop().hide();
	}
	document.getElementById("btnCalloutsUndo").disabled=(allCallouts.length==0);
}

function _onCortonaMouseDown(Button, Shift, X, Y){
	navControl.checkMode();
	if(isCalloutsMode && Button==1){
		if(document.getElementById("txtCalloutCaption").value==""){
			setTimeout("alertx(iWarningEmptyCalloutTextBox)", 0);
			document.getElementById("txtCalloutCaption").focus();
			return;
		}
		calloutDraw = new Callout3D(document.getElementById("txtCalloutCaption").value, X, Y, X, Y);
		calloutDraw.show();
	}
}
function _onCortonaMouseUp(Button, Shift, X, Y){
	navControl.checkMode();
	if(calloutDraw!=null){
		calloutDraw.setPoint2(X, Y);
		allCallouts.push(calloutDraw);
		calloutDraw = null;
		document.getElementById("btnCalloutsUndo").disabled=false;
	}
}
function _onCortonaMouseMove(Button, Shift, X, Y){
	if(calloutDraw!=null){
		calloutDraw.setPoint2(X, Y);
	}
}

function onTdSelectionresize(){
	document.getElementById("td3DSelection").firstChild.style.display = (leftSideTD.offsetWidth > 385)? '': 'none';
}

function embed3DControl() {
	var BackColor = "FFFFFF";
	var loadingText = "Loading...";
	if(with3D){
		try{
			BackColor = clr3DBackgroundColor.substr(5,2)+clr3DBackgroundColor.substr(3,2)+clr3DBackgroundColor.substr(1,2);
		}catch(e){}
		if(isMSIE){
			try{
				loadingText = iLoadingMessage;
			}catch(e){}
			document.body.style.cursor=resFolder+"hourglas.ani";
			document.getElementById('cortonaContainer').innerHTML = '<table id="loading_table" width="100%" height="100%"><tr><td align="center" valign="middle" class="loadingMessage">'+loadingText+'</td></tr></table><object style="display:none;" id="cortonaControl" width="100%" height="100%" type="application/x-oleobject" classid="CLSID:86A88967-7A20-11D2-8EDA-00600818EDB1" border="0"><param name="Src" value="'+ipc_data.vrmlfile+'"/><param name="ConsoleMode" value="0"/><param name="ContextMenu" value="False"/><param name="LoadDroppedScene" value="False"/><param name="HeadLight" value="True"/><param name="NavigationBar" value="0"/><param name="RendererHints" value="5168"/><param name="RendererName" value="DirectX Renderer"/><param name="RendererOptimization" value="0"/><param name="ShowLogo" value="False"/><param name="TravelSpeed" value="2"/><param name="viewpoint_transition_mode" value="0"/><param name="WaitForAllResources" value="True"/><param name="BackColor" value="&h'+BackColor+'"/><param name="PixelBufferAccess" value="True"/><param name="Skin" value="{1706B265-E103-4332-9871-7FEE6C37C699}"/></object> <div id="block_div" style="position:absolute; z-index:10; overflow:hidden; top:0; left:0; width:3000px; height:3000px; background-color:transparent;"><table width="100%" height="100%"><tr>&nbsp;<td></td></tr></table></div>';
		}else{
			document.getElementById('cortonaContainer').innerHTML = '<embed type="application/x-cortona" width="100%" height="100%" id="cortonaControl" src="'+ipc_data.vrmlfile+'" consolemode="0" contextmenu="false" vrml_background_color="'+clr3DBackgroundColor+'" cpuloading="80" loaddroppedscene="false" rendererhints="5168" renderername="DirectX Renderer" rendereroptimization="0" headlight="true" navigationbar="0" pixelbufferaccess="true" skin="{1706B265-E103-4332-9871-7FEE6C37C699}" vrml_splashscreen="false" travel_speed="2" viewpoint_transition_mode="0" WaitForAllResourses="true" />';
		}
		cortona = document.getElementById('cortonaControl');
	}
}

function embed2DControl() {
	if(with2D){
	  if(isMSIE){
		if(viewer2D==1){
				document.getElementById('Container2D').innerHTML = '<object id="cortona2DControl" classid="CLSID:1D4A81CB-25A3-4EB7-A75E-4F8A5386D8F8" width="100%" height="100%"></object><script language="javascript" event="HotspotHit(sID, KeyState)" for="cortona2DControl">return on_Control2D_ObjectHit(1, sID, "", KeyState);</script><script language="javascript" event="HotspotEnter(sID)" for="cortona2DControl">on_Control2D_ObjectHit(0, sID, "");</script><script language="javascript" event="HotspotLeave(sID)" for="cortona2DControl">on_Control2D_ObjectHit(0, "", "");</script><script language="javascript" event="HotspotMenu(HotspotID, MenuObj)" for="cortona2DControl">on_Control2D_HotspotMenu(HotspotID, MenuObj);</script><script language="javascript" event="HotspotMenuSelect(HotspotID, MenuItemID)" for="cortona2DControl">on_Control2D_HotspotMenuSelect(HotspotID, MenuItemID);</script>';
		}else if(viewer2D==2){
				document.getElementById('Container2D').innerHTML = '<object id="cortona2DControl" classid="CLSID:865B2280-2B71-11D1-BC01-006097AC382A" width="100%" height="100%"></object><script language="javascript" event="ObjectHit(nMouseBtn, strObject)" for="cortona2DControl">on_Control2D_ObjectHit(nMouseBtn, strObject);</script><script language="javascript" event="ContextMenuItemHit(item, Title)" for="cortona2DControl">on_Control2D_ContextMenuItemClick(item, Title);</script>';
		}
	  }else{
			document.getElementById('Container2D').innerHTML = '<embed type="application/x-rapidview" id="cortona2DControl" style="width:100%; height:100%;" src="'+resFolder+'empty.cgm"/>';
			viewer2D = 1;
	  }
	  Control2D = document.getElementById('cortona2DControl');
	}
}

function alertx(sNote){
	if(sNote!="")alert(sNote);
}

/************
 * CgmView
 */
var ISOSELECTEDCOLOR = RGB(255,255,0);
var ISOHLIGHTEDCOLOR = RGB(50,255,50);
var ISONORMALCOLOR = RGB(255,255,255);
var isControl2DNotFound = true;
var isCGMLoaded = false;

function RGB( r, g, b ){
	return ( r + g*256 + b*65536 );
}

function checkControl2D(){
		if(isControl2DNotFound)C2D_check();
		if(isControl2DNotFound){
			if(viewer2D==1){
					document.getElementById('Container2D').innerHTML = '<table id="Container2D" width="100%" height="100%"><tr><td align="center" valign="middle" class="errorMessage">'+iCaptionRapid2DViewerNotFound+'</td></tr></table>';
					alertx(iWarningRapid2DViewerNotFound);
			}else if(viewer2D==2){
				alertx(iWarningIsoViewNotFound);
			}
		}
		reset2DContextMenu();
}

function load_2D_graphics(filename){
	C2D_check();
	if(isControl2DNotFound)return;
	C2D_closeFile();
	if(!filename || filename=="")
		return;
	isCGMLoaded = C2D_open(filename);
	errCode = [(!isCGMLoaded && !is2D), filename];
	if(!isCGMLoaded && is2D){
		alertx(iWarning2DViewerLoadingError+" "+filename);
	}
	if(viewer2D==2){
		var isCstmTlbr = true;
		if(typeof(iCompleteControl2DToolBox) != 'undefined'){
		 isCstmTlbr = !iCompleteControl2DToolBox;
		}else{
			if((specType == "ATA" && (typeof(isFixedPrintTable) != 'undefined') && isFixedPrintTable) || specType == "ITEM")isCstmTlbr = false;
		}
		try{
			if(isCstmTlbr && parseInt(Control2D.GetVersion().substr(0,1))>=6){
				Control2D.ConfigTools2( 1, 1 + 2 + 4 + 32, 1, false, false );
			}
			Control2D.Iso4SetPreference("use_default_printer", 0);
		}catch(e){}
		Control2D.AcceptDroppedFiles = false;
		Control2D.Iso3SetObjectTipStyle( "Arial", 8, 0, 1, 1, 1000 );
		Control2D.ResizeToFit = true;
		Control2D.SetPrintStringStyle( 1, "Tahoma", 8, 0, 0, 20.0, 20.0, 5.0, 5.0 );
		Control2D.SetPrintStringStyle( 2, "Tahoma", 8, 0, 0, 20.0, 20.0, 5.0, 5.0 );
		Control2D.Iso3SetHome(filename);
	}
	setTimeout("gohome_iso();", 200);
	ISOSELECTEDCOLOR = get2DColor(clr2DSelectedColor, ISOSELECTEDCOLOR);
	ISOHLIGHTEDCOLOR = get2DColor(clr2DHighLightColor, ISOHLIGHTEDCOLOR);
	if(viewer2D==1){
		Control2D.HitColor=ISOHLIGHTEDCOLOR;
	}
	if(isFirstISO && with2D){
		var st = document.getElementById('Container2D').style;
		st.display = '';
		st.width = '';
		st.height = '';
	}
	reset2DContextMenu();
}

function get2DColor(sHtmlColor, defaultValue){
	var nColor = defaultValue;
	try{
		nColor = RGB(parseInt("0x"+sHtmlColor.substr(1,2)), parseInt("0x"+sHtmlColor.substr(3,2)), parseInt("0x"+sHtmlColor.substr(5,2)));
	}catch(e){}
	return nColor;
}

function select_iso(hotspot){
	C2D_HHsp(hotspot, true, ISOSELECTEDCOLOR);
}

function unselect_iso(hotspot){
	C2D_HHsp(hotspot, false, ISONORMALCOLOR);
}

function hlight_iso(hotspot){
	C2D_HHsp(hotspot, true, ISOHLIGHTEDCOLOR);
}
function unhlight_iso(hotspot){
	C2D_HHsp(hotspot, false, ISONORMALCOLOR);
}


var contextItem = null;
var cmenuActions = [];
function dispose2DContextMenu(){
	if(viewer2D==2){
		Control2D.DisposeContextMenu();
		cmenuActions = [];
	}
}
function add2DContextItem(description, isEnabled, cmAction){
	if(description!="" && viewer2D==2){
		Control2D.AddContextMenuItem(description, isEnabled);
		if(isEnabled){
			cmenuActions.push(cmAction);
		}else{
			cmenuActions.push(null);
		}
	}
}

function reset2DContextMenu(){
	if(isControl2DNotFound || viewer2D!=2)return;
	dispose2DContextMenu();
	add2DContextItem(iContextMenuAbout, true, "showAbout();");
	Control2D.CreateContextMenu();
}

function on_Control2D_ObjectHit(nMouseBtn, strObject, sName, KeyState){
	dispose2DContextMenu();
	var hid = strObject;
	if(viewer2D==1){
		if(strObject!=""){
			hid = Control2D.GetHotspotName(strObject);
		}
	}else if(viewer2D==2){
		try{
			hid = Control2D.Iso3GetObjectName(strObject);
		}catch(e){}
	}
	if(nMouseBtn==1){
		var ks = 0;
		if(arguments.length > 3)ks=KeyState;
		workTable.onClick2D(hid, ks);
	}else{
		workTable.onOver2D(hid);
	}
	if(viewer2D==2){
		contextItem = workTable.getItemBy2DHotspot(hid);
		if(contextItem!=null){
			var item = contextItem;
			var chck = "if(contextItem!=null)";
			add2DContextItem(item.getTitle(), false);
			if(item.presentInSheet){
				if(item.selected){
					add2DContextItem(iContextMenuUnselect, true, chck+"contextItem.select(false);");
				}else{
					add2DContextItem(iContextMenuSelect, true, chck+"contextItem.select(true);" );
				}
			}
			var vs = rightViews;
			var jumps = [];
			for(var i=0; i<vs.length; i++){
				if(!vs[i].hidden){
					var v = vs[i];
					for(var j=0; j<v.items.length; j++){
						if(v.items[j]==item.index){
							jumps.push(v);
							break;
						}
					}
				}
			}
			if(!workTable._checkUnusedItem(item)){
				if(jumps.length>0){
					add2DContextItem("---", false);
					for(var i=0; i<jumps.length; i++){
						var descr = iContextMenuGotoViewPrefix+" "+_cut_sheet_description(jumps[i].description);
						if(jumps[i].id==current_view){
							add2DContextItem(descr+" "+iContextMenuActiveViewMark, false);
						}else{
							add2DContextItem(descr, true, "activateView(\""+jumps[i].id+"\");");
						}
					}
				}
			}
			add2DContextItem("---", false);
			var links = ipc_data.dplist[item.index].links;
			if(links.length>0){
				for(var i=0; i<links.length; i++){
					add2DContextItem(links[i].description, true, "openLink(\""+links[i].href+"\");");
				}
				add2DContextItem("---", false);
			}
		}
		add2DContextItem(iContextMenuAbout, true, "showAbout();");
		Control2D.CreateContextMenu();
	}
	return true;
}

var cmenuObjs = {};

function on_Control2D_HotspotMenu(HotspotID, MenuObj){
	MenuObj.RemoveMenuItem(32777);
	MenuObj.RemoveMenuItem(32778);
	cmenuObjs={};
	if(HotspotID!=""){
		var hsName = Control2D.GetHotspotName(HotspotID);
		if(hsName!=""){
			contextItem = workTable.getItemBy2DHotspot(hsName);
			if(contextItem!=null){
				MenuObj.RemoveAll();
				var item = contextItem;
				MenuObj.AppendMenuItem(item.getTitle(), 0x0001+0x0002);
				if(item.selected){
					cmenuObjs[MenuObj.AppendMenuItem(iContextMenuUnselect, 0x0020)]="if(contextItem!=null)contextItem.select(false);";
				}else{
					cmenuObjs[MenuObj.AppendMenuItem(iContextMenuSelect, 0x0020)]="if(contextItem!=null)contextItem.select(true);";
				}
				var vs = rightViews;
				var jumps = [];
				for(var i=0; i<vs.length; i++){
					if(!vs[i].hidden){
						var v = vs[i];
						for(var j=0; j<v.items.length; j++){
							if(v.items[j]==item.index){
								jumps.push(v);
								break;
							}
						}
					}
				}
				if(!workTable._checkUnusedItem(item)){
					if(jumps.length>0){
						for(var i=0; i<jumps.length; i++){
							var strtLn =(i==0)? 0x0020 : 0;
							var descr = iContextMenuGotoViewPrefix+" "+_cut_sheet_description(jumps[i].description);
							if(jumps[i].id==current_view){
								cmenuObjs[MenuObj.AppendMenuItem(descr+" "+iContextMenuActiveViewMark, 0x0001+0x0002+0x0004+strtLn)]="";
							}else{
								cmenuObjs[MenuObj.AppendMenuItem(descr, strtLn)]="activateView(\""+jumps[i].id+"\");";
							}
						}
					}
				}
				var links = ipc_data.dplist[item.index].links;
				if(links.length>0){
					for(var i=0; i<links.length; i++){
						cmenuObjs[MenuObj.AppendMenuItem(links[i].description, ((i==0)? 0x0020 : 0))]= "openLink(\""+links[i].href+"\");";
					}
				}
				
			}
		}
	}
	cmenuObjs[MenuObj.AppendMenuItem(iContextMenuAbout, 0x0020)]="showAbout();";
/*	
	RVMF_DISABLED           = 0x0001,
    RVMF_GRAYED             = 0x0002,
	RVMF_CHECKED            = 0x0004,
	RVMF_INSERT_AT_TOP      = 0x0010,
	RVMF_SEPARATOR_BEFORE   = 0x0020,
	RVMF_SEPARATOR_AFTER    = 0x0040,
    RVMF_BREAK_BEFORE       = 0x0080,
*/
}

function on_Control2D_HotspotMenuSelect(HotspotID, MenuItemID){
	try{
		eval(cmenuObjs[MenuItemID]);
	}catch(err){}
}

function on_Control2D_ContextMenuItemClick(item, Title){
	try{
		if(cmenuActions.length>=item){
			eval(cmenuActions[item-1]);
		}
	}catch(e){}
}

function gohome_iso(){
	if(isControl2DNotFound || !isCGMLoaded)return;
	if(viewer2D==1)Control2D.ResetView();
	else if(viewer2D==2)Control2D.GoHome();
	if(isFirstISO && with2D){
		isFirstISO = false;
		hideCortona2D(!is2D);
	}
}

function print2D(){
	if(isControl2DNotFound || !isCGMLoaded)return;
	var sheet_title = view_description;
	if(sheet_title.length>50)sheet_title = sheet_title.substr(0,48)+"...";
	var tCGMHeader = "";
	var tCGMFooter = (iPrintCGMFooterProprietary!="")? iPrintCGMFooterProprietary+" ": "";
	if(specType=="S1000D"){
		tCGMHeader = iPrintCGMHeaderTitle+" "+M_CSN+"   "+iFigureNamePrefix+" "+M_FIGURE+"   "+iRevisionNamePrefix+" "+M_TSN+"  "+formated_rev_date+" "+sheet_title;
		tCGMFooter = tCGMFooter+iPrintCGMFooterPrinted+_getFormatedDate(GetCurrentDate());
	}else if(specType=="GENERIC"){
		tCGMHeader = iPrintCGMHeaderTitle+" "+M_TITLE+"  "+sheet_title;
		tCGMFooter = tCGMFooter+iPrintCGMFooterPrinted+_getFormatedDate(GetCurrentDate());
	}else if(specType=="ATA"){
		tCGMHeader = iPrintCGMHeaderTitle+" "+M_CSN+"   "+iFigureNamePrefix+" "+M_FIGURE+"   "+iRevisionNamePrefix+" "+M_TSN+"  "+formated_rev_date+" "+sheet_title;
		tCGMFooter = tCGMFooter+iPrintCGMFooterPrinted+_getFormatedDate(GetCurrentDate());
	}else if(specType=="ITEM"){
		tCGMHeader = iPrintCGMHeaderTitle+M_TOOLNBR+"   "+iRevisionNamePrefix+" "+M_TSN+"  "+formated_rev_date+" "+sheet_title;
		tCGMFooter = tCGMFooter+iPrintCGMFooterPrinted+_getFormatedDate(GetCurrentDate());
	}
	C2D_print(tCGMHeader, tCGMFooter);
}

function cortona2DControl_HotspotHit(sID, KeyState){on_Control2D_ObjectHit(1, sID, "", KeyState);}
function cortona2DControl_HotspotEnter(sID){on_Control2D_ObjectHit(0, sID, "");}
function cortona2DControl_HotspotLeave(sID){on_Control2D_ObjectHit(0, "", "");}
function cortona2DControl_HotspotMenu(HotspotID, MenuObj){on_Control2D_HotspotMenu(HotspotID, MenuObj);}
function cortona2DControl_HotspotMenuSelect(HotspotID, MenuItemID){on_Control2D_HotspotMenuSelect(HotspotID, MenuItemID);}

//==================2D Controls Wrappers
function C2D_check(){
	try{
		Control2D.CloseFile();
		isControl2DNotFound = false;
		if(viewer2D==1 && typeof(langID)!= 'undefined')Control2D.LangID=langID;
	}catch(e){
		isControl2DNotFound = true;
	}
	return !isControl2DNotFound;
}
function get_basepath() {
	var path = location.href.split('/');
	path.pop();
	path.push('');
	path = path.join('/');
	return path;
}
function C2D_open(filename){
	var isSuccess = false;
	try{
		if(viewer2D==1){
			Control2D.src = get_basepath()+filename;
			isSuccess = true;
			if(isChrome){
				if(chrmCrc[0]){
					chrmCrc[0] = false;
					chrmCrc[2] = filename;
					chrmCrc[1] = setTimeout("C2D_open(chrmCrc[2]);", 2000);
				}else if(chrmCrc[1]){
					clearTimeout(chrmCrc[1]);
					chrmCrc[1]=null;
				}
			}
		}else if(viewer2D==2){
			isSuccess = Control2D.Iso3OpenFile(filename);
		}
	}catch(e){}
	return isSuccess;
}
function C2D_closeFile(){
	Control2D.CloseFile();
}
function C2D_print(sHeader, sFooter){
	if(viewer2D==1){
		Control2D.Print(sHeader, sFooter);
	}else if(viewer2D==2){
		Control2D.SetPrintStrings(sHeader, sFooter);
		Control2D.DoPrint(1, 0, 1, -1);
	}
}
function C2D_version(){
	try{
		if(viewer2D==1){
			return "Cortona2D Viewer "+Control2D.GetVersion();
		}else if(viewer2D==2){
			return "IsoView "+Control2D.GetVersion();
		}
	}catch(e){}
	return "";
}
function C2D_HHsp(sHotspotName, bFlag, color){
	if(isControl2DNotFound || !isCGMLoaded || sHotspotName==null)return;
	if(viewer2D==1){
		var ids = [];
		try{ids = Control2D.GetHotspotIDs(sHotspotName).toArray();}catch(e){}
		for(var i=0; i<ids.length; i++){
			Control2D.HighlightHotspot(ids[i], bFlag, color); 
		}
	}else if(viewer2D==2){
		Control2D.Iso3HighlightObject("name("+sHotspotName+",all)", (bFlag)?4:0, color);
	}
}

function C2D_findHotspot(sHotspotName){
	if(isControl2DNotFound || !isCGMLoaded || sHotspotName==null)return false;
	var isFound = false;
	if(viewer2D==1){
		try{isFound = Control2D.GetHotspotIDs(sHotspotName).toArray().length>0;}catch(e){}
	}else if(viewer2D==2){
		try{isFound = (Control2D.Iso3GetObjectLayer("name("+sHotspotName+")")!="");}catch(e){}
	}
	return isFound;
}

function C2D_setTooltip(sHotspotName, value){
	try{
		if(viewer2D==1){
			var ids = [];
			try{ids = Control2D.GetHotspotIDs(sHotspotName).toArray();}catch(e){}
			for(var i=0; i<ids.length; i++){
				Control2D.SetObjectTip(ids[i], value);
			}
		}else if(viewer2D==2){
			Control2D.Iso3SetObjectTip("name("+sHotspotName+",all)", value);
		}
	}catch(e){}
}

//=================================================
function getCGM(viewName){
	var cgmName = "";
	var vs = rightViews;
	for(var i=0; i<vs.length; i++){
		if(vs[i].id==current_view){
			try{cgmName = vs[i].cgmsrc;}catch(e){}
			break;
		}
	}
	return cgmName;
}
var user_chkbxs = true;
function hideCheckBoxesColumn(flag){
	user_chkbxs = flag;
	_HideColumn("colChckboxes0", flag);
	_HideColumn("colChckboxes1", flag);
}

function _HideColumn(columnName, flag){	
	if(isMSIE)document.getElementById(columnName).style.display = (flag)? '': 'none';
	else{
		if(!isOpera)document.getElementById(columnName).style.visibility = (flag)? '': 'collapse';
		
		try{
			var vis = (flag)? '': 'hidden';
			var nodeList = document.querySelectorAll(".chkbox");
			for (var i = 0, length = nodeList.length; i < length; i++){
				nodeList[i].style.visibility = vis;
			}
		}catch(err){}
    }
}

function hideCortona3D(flag){
	var cc = document.getElementById('cortonaContainer');
	if(isMSIE){
		cortona.style.display = (!flag)? '': 'none';
		cc.style.display = (!flag)? '': 'none';
	}else{
		if(flag){
			cc.style.width = "1px";
			cc.style.height = "1px";
			cc.style.visibility = "hidden";
		}else{
			cc.style.width = "100%";
			cc.style.height = "100%";
			cc.style.visibility = "";
		}
	}
}
function hideCortona2D(flag){
	if(with2D){
		var c2d = document.getElementById('Container2D');
		if(isMSIE){
			c2d.style.display = (!flag)? '': 'none';
		}
		if(flag){
			c2d.style.width = "1px";
			c2d.style.height = "1px";
			c2d.style.visibility = "hidden";
		}else{
			c2d.style.width = "100%";
			c2d.style.height = "100%";
			c2d.style.visibility = "";
		}
	}
}

function set2D(flag){
	is2D = flag;
	hideCortona3D(is2D);
	hideCortona2D(!is2D);
	document.getElementById("bottomToolbar1Td").style.display = (!is2D)? '': 'none';
	document.getElementById("bottomToolbar2Td").style.display = (!is2D)? '': 'none';
	document.getElementById("lblChbxShowBoxes").style.display = (!is2D)? '': 'none';
	document.getElementById("chbxShowBoxes").style.display = (!is2D)? '': 'none';
	document.getElementById("btn_callouts").style.display = (!is2D)? '': 'none';
	document.getElementById("btn_ignoretransp").style.display = (!is2D)? '': 'none';
	document.getElementById("btn_skipanimation").style.display = (!is2D)? '': 'none';
	document.getElementById("chbxShowBoxes").disabled = (is2D);
	_HideColumn("colChckboxes0", (!is2D && user_chkbxs));
	_HideColumn("colChckboxes1", (!is2D && user_chkbxs));
	document.getElementById("chbxShowBoxes").checked = (is2D)? false: user_chkbxs;
	if(flag)checkControl2D();
	if(errCode[0]){
			alertx(iWarning2DViewerLoadingError+" "+errCode[1]);
			errCode[0]=false;
	}
}

function getVersion(){
	var pVersion = "2.5.7.126";
	try{pVersion = ipcPublisherVersion;}catch(e){}
	var sVersion = "0.0";
	if((typeof(ipcSpecVersion) != 'undefined') && ipcSpecVersion!="")sVersion = ipcSpecVersion;
	return pVersion+"-"+sVersion+"-"+ipcScriptVersion;
}

function showAbout(){
	var aboutControls = "";
	if(with3D)aboutControls += "\n"+ iAboutCortonaVersion+" "+workTable.cortona.Version;
	if(with2D){
		var cv = "None";
		cv = C2D_version();
		aboutControls += "\n"+ iAboutCgmViewerVersion+" "+cv;
	}
	alertx(iAboutDocumentVersion+" "+getVersion()+aboutControls);
}

function correctCollumnsWidth(){
	var headerTDs = getTableCollumns1(document.getElementById('mainHeader'));
	var tableTDs = getTableCollumns1(document.getElementById('mainTable'));
	var wds = new Array();
	for(var i=0; (i<headerTDs.length && i<tableTDs.length); i++){
		wds.push(Math.max(headerTDs[i].offsetWidth, tableTDs[i].offsetWidth));
	}
	headerTDs = getTableCollumns(document.getElementById('mainHeader'));
	tableTDs = getTableCollumns(document.getElementById('mainTable'));
	var screenStyle = getStyleSheets("screen");
	var sum = 0;
	for(var i=0; i<wds.length; i++){
		headerTDs[i].style.width = wds[i]+"px";
		tableTDs[i].style.width = wds[i]+"px";
		sum+=wds[i];
	}
	document.getElementById("mainHeader").style.tableLayout="fixed";
	document.getElementById("mainHeader").style.width=sum+"px";
	var mtb = getCSSRule("screen", "#mainTable");
	if(mtb!=null){
		mtb.style.tableLayout="fixed";
		mtb.style.width=sum+"px";
	}
	
	if((typeof(isSetScreenHeaderWidth) != 'undefined') && isSetScreenHeaderWidth){
		var hRule = getCSSRule("screen", "#screenHeader");
		if(hRule!=null){
			hRule.style.width=sum+"px";
		}
	}
	if(specType=="ITEM"){
		try{
			if(document.getElementById("metaHeaderTable").clientHeight<document.getElementById("divMetaInfoContainer").clientHeight){
				if(metaHeaderTable.clientHeight==0){
					document.getElementById("divMetaInfoContainer").style.display="none";
				}else{
					getCSSRule("screen", "div.metaInfoContainer").style.height = document.getElementById("metaHeaderTable").clientHeight+"px";
				}
			}
		}catch(e){}
		document.getElementById("divMetaInfoContainer").style.visibility = "visible";
		document.getElementById("tableHeaderName0").style.visibility = "visible";
	}

	document.getElementById("screenHeader").style.display="";
	document.getElementById("mainHeader").style.visibility = "visible";
	if(!isMSIE){
		var rows = document.getElementById("mainTable").rows;
	    for (var row=0; row<rows.length; row++) {
	      var cells = rows[row].cells;
	      if(cells.length>1)cells[1].className += " cbox";
	    }
    }
}

function getTableCollumns(table){
	var cols = [];
	var allcols = table.getElementsByTagName("col");
	for(var i=0; i<allcols.length; i++){
		if(allcols[i].parentNode.parentNode==table || allcols[i].parentNode==table){
			cols.push(allcols[i]);
		}
	}
	return cols;
}

function getTableCollumns1(table){
	var cols = new Array();
	var r = table.rows.length-2;
	var clmns = 0;
	for(var i=table.rows.length-1; i>=0; i--){
		if(clmns<table.rows[i].cells.length){
			clmns = table.rows[i].cells.length;
			r=i;
		}
	}
	
	var clls = table.rows[r].cells;
	for(var i=0; i<clls.length; i++){
		cols.push(clls[i]);
	}
	return cols;
}

function getCSSRule(styleMedia, ruleName) {
	var screenStyles = [];
	var rNames = [];
	for(var i = 0; i < document.styleSheets.length; i++){
		if(isMSIE){
			if(document.styleSheets(i).media.toLowerCase()==styleMedia.toLowerCase()){
				screenStyles.push(document.styleSheets(i));
			}
		}else{
			if(document.styleSheets[i].media.mediaText.toLowerCase()==styleMedia.toLowerCase()){
				screenStyles.push(document.styleSheets[i]);
			}
		}
	}
	if(screenStyles.length>0){
		for(var z = 0; z < screenStyles.length; z++){
			var rules = (isMSIE)? screenStyles[z].rules : screenStyles[z].cssRules;
			if(rules){
			for(var i = 0; i < rules.length; i++){
				if(rules[i].selectorText.toLowerCase()==ruleName.toLowerCase()){
					return rules[i];
				}
			}
			}
		}
	}
	return null;
}

function getStyleSheets(styleMedia) {
	var screenStyle = null;
	for(var i = 0; i < document.styleSheets.length; i++){
		if(isMSIE){
			if(document.styleSheets(i).media.toLowerCase()==styleMedia.toLowerCase()){
				screenStyle = document.styleSheets(i);
			}
		}else{
			if(document.styleSheets[i].media.mediaText.toLowerCase()==styleMedia.toLowerCase()){
				screenStyle = document.styleSheets[i];
			}
		}
	}
	return screenStyle;
}

//====================
function fdmm(){}

function DmmApi()
{
    this.tooltipOver3D = {hide: fdmm, setTooltipHTML: fdmm};
	return this;
}
DmmApi.prototype.activatePageViewpoint = fdmm;
DmmApi.prototype.setIPCView = fdmm;
DmmApi.prototype.hide_background_geometry = fdmm;
DmmApi.prototype.show_background_geometry = fdmm;
DmmApi.prototype.fitToParts = fdmm;
DmmApi.prototype.getIPCPartByIndex = function(){return new DmmPart();}
DmmApi.prototype.setAutoRefreshOff = fdmm;
DmmApi.prototype.setAutoRefreshOn = fdmm;
DmmApi.prototype.restoreAutoRefresh = fdmm;
DmmApi.prototype.doRefresh = fdmm;

function DmmPart() {
	this.withoutGeometry = true;
}

DmmPart.prototype.restoreVrmlNodesMaterial = fdmm;
DmmPart.prototype.resetVrmlNodesMaterial = fdmm;
DmmPart.prototype.setEmissiveColor = fdmm;
DmmPart.prototype.setDiffuseColor = fdmm;
DmmPart.prototype.setTransparency = fdmm;
DmmPart.prototype.getTransparency = fdmm;
DmmPart.prototype.show = fdmm;
DmmPart.prototype.filter = function(){return false;}
DmmPart.prototype.fit = fdmm;
DmmPart.prototype.setCenterpoint = fdmm;
DmmPart.prototype.getVisibility = function(){return false;}
DmmPart.prototype.checkFullTransparency = function(){return true;}

function disableButton(bttnName, bFlag){
	document.getElementById(bttnName).disabled = bFlag;
	if(!isMSIE)document.getElementById(bttnName).style.color = (bFlag)? "#777777": "";
}

//===================================
function compositePrint(){
	document.getElementById("meta_currentdate").innerHTML = iPrintTableFooterPrinted+_getFormatedDate(GetCurrentDate());
	document.getElementById("colChckboxes1").className = "hideOnPrint";
	if(document.getElementById("metasheet"))document.getElementById("metasheet").innerText = "";
	isSpPrn = true;
	prepareGraphics();
	setTimeout("printTable();", 0);
}
function prepareGraphics(){
	var hdr = document.getElementById("prnHeader").innerHTML;
	var ftr = document.getElementById("pageFooter").innerHTML;
	var syntax = "";
	var vs = [];
	for(var i=0; i<rightViews.length; i++){
		if(rightViews[i].cgmsrc && rightViews[i].cgmsrc!=""){
			vs.push(i);
			syntax += '<table class="crvTable" border="0" cellspacing="0" cellpadding="0" width="100%" height="100%"><tr><td>'+hdr.replace(/metasheet/g, 'metasheet_2d'+i)+'</td></tr><tr><td class="tdCRV" align="center" valign="middle"><object class="RapidViewControl" id="RpdCntr'+i+'" classid="CLSID:1D4A81CB-25A3-4EB7-A75E-4F8A5386D8F8" style="width:150mm; height:200mm"><param name="SRC" value="'+get_basepath()+rightViews[i].cgmsrc+'"/></object></td></tr>'+ftr+'</table>';
		}
	}
	document.getElementById("grPrn").innerHTML=syntax;
	try{
	for(var i=0; i<vs.length; i++){
  		document.getElementById("metasheet_2d"+vs[i]).innerText = rightViews[vs[i]].description;
  	}
	if(vs.length>0 && typeof(document.getElementById("RpdCntr"+vs[0]).backColor)=='undefined'){
  	  	alertx(iWarningRapid2DViewerNotFound);
  	  	for(var i=0; i<vs.length; i++){
  	  		document.getElementById("RpdCntr"+vs[i]).outerHTML ='<div style="padding-top:50%;">'+iCaptionRapid2DViewerNotFound+'</div>';
  	  	}
  	}
  	}catch(err){}
}


function fBeforePrint(){
	if(isSpPrn){
  		workTable.setPrintMode(true);
  	}
}
function fAfterPrint(){
	if(isSpPrn){
		isSpPrn = false;
		document.getElementById("grPrn").innerHTML="";
		document.getElementById("colChckboxes1").className = "col01";
	  	if(specType!="GENERIC" && document.getElementById("metasheet"))document.getElementById("metasheet").innerText = view_description;
	  	workTable.setPrintMode(false);
  	}
}

//=======SPECIAL FUNCTIONS============
function moreInfo(nItem){
	workTable.contextMenuClose();
	NOMENCLATURE_NUMBER = workTable.getItem(nItem).nn;
	eval(jsMoreInfo);
}
function showCart(){
	workTable.contextMenuClose();
	eval(jsShowCart);
}
function addToCart(nItem){
	workTable.contextMenuClose();
	NOMENCLATURE_NUMBER = workTable.getItem(nItem).nn;
	eval(jsAddToCart);
}
function addSelectedToCart(){
	workTable.contextMenuClose();
	SELECTED_NUMBERS = [];
	for(var i=0; i<selectedItms.length; i++){
		SELECTED_NUMBERS.push(selectedItms[i].nn);
	}
	eval(jsAddSelectedToCart);
}