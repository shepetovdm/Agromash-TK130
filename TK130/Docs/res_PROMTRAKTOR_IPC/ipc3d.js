/*
 * 3D IPC API
 * ipc3d.js 15:19 12.01.2012
 */

var _api_b078f91531cd496ea19f383bd8fbf6a5 = null;

function IPCApi(cortona, tooltip)
{	
  if(_api_b078f91531cd496ea19f383bd8fbf6a5 == null)
  {
  // constants
    this.VERSION = "1.5.0.29";
    this.STOP = 0;
    this.PLAY = 1;
    this.PAUSE = 2;
  
  // variables
    this.MOUSE_MOVE_SENSITIVITY = 3;
    this.TOOLTIP_DELAY = 500;
    this.ENABLE_TOOLTIPS = true;
    this.SKIP_TRANSPARENT_SHAPES = true;
    this.SKIP_TRANSPARENCY_THRESHOLD_LEVEL = 0;
    this.STANDARD_VIEWS = {front:"0 1 0 3.14159", back:"0 1 0 0", left:"0 -1 0 1.5708", right:"0 1 0 1.5708", top:"1 0 0 -1.5708", bottom:"0 .707107 -.707107 3.14159", isometric:"-.156558 -.912487 -.377964 2.41886"};
    this.MIN_ZOOM_MINIMUM = 0;
    this.MIN_ZOOM_MAXIMUM = 0.3;
    this.DEFAULT_MIN_ZOOM = 0.3;
    this.DEFAULT_MAX_ZOOM = 150;
    this.ZOOM_CORRECTION_FACTOR = 2;
    
    this.ATP = 0;
    
    this.CALLOUT_COLOR = [0, 0, 0];
    this.CALLOUT_FONT_SIZE = 3;
    this.CALLOUT_PROTO ='PROTO Callout3D[exposedField SFString id "" exposedField SFColor color 0 0 0 exposedField SFColor backgroundColor 1 1 1 exposedField MFVec3f point [0 0 0, 0 0 0] exposedField SFVec3f p1 0 0 0 exposedField SFVec3f p2 0 0 0	exposedField SFString body ""]{Group{children[Shape{appearance Appearance{material Material{diffuseColor 0 0 0 emissiveColor IS color}}geometry IndexedLineSet{coord DEF Crd Coordinate{point IS point }coordIndex [0 1 -1]}}DEF TR Transform{center IS p1 translation IS p2 children[Panel{source HTMLText{body IS body padding [2, 2, 2, 2]}sticky TRUE backgroundTransparency 0 backgroundColor IS backgroundColor	offsetTop "7" offsetLeft "7" borderColor IS color borderSize 1}]}]}} ';
    
    
    this.uiActions = ["revokePropPage:{E5711FD5-464F-11D3-9D7D-00A0247A5F3F}", "revokePropPage:{EC48A005-4978-11D3-9D7E-00A0247A5F3F}", "revokePropPage:{E5711FD4-464F-11D3-9D7D-00A0247A5F3F}", "revokePropPage:{4E98BA8B-91CE-45C3-B62A-1C67CB99EB75}"];
        
    this.ICA_CONTROL_SCRIPT_SYNTAX = "PROTO IPCSimulation[eventIn SFFloat setMinZoom eventIn SFFloat setMaxZoom eventOut SFNode ControlScript exposedField SFNode procedure NULL exposedField SFInt32 whichChoice 0 exposedField MFNode externalAxes[] eventIn SFBool set_ui_smoothcontrol eventIn SFBool set_ui_axis eventIn SFBool set_ui_zoom eventIn SFBool set_ui_vcr eventIn SFTime vcr_play eventIn SFTime vcr_stop eventIn SFTime vcr_pause eventIn SFTime vcr_forward eventIn SFTime vcr_backward eventIn SFTime vcr_next eventIn SFTime vcr_previous eventIn SFString vcr_goto eventIn SFString vcr_set_position eventIn SFFloat vcr_set_fraction eventIn SFFloat set_speed_ratio eventIn SFBool set_stop_by_substep eventIn SFBool set_stop_by_step eventIn SFTime zoom_reset eventIn SFFloat zoom_set_delta eventIn SFFloat zoom_set_level eventIn SFFloat vcr_set_proc_fraction eventIn SFFloat vcr_set_step_fraction eventIn SFFloat set_substep_fraction eventIn SFFloat set_procedure_fraction eventIn SFFloat set_step_fraction eventIn MFFloat now_step_substep_fraction eventIn SFBool set_ignore_viewpoints eventOut MFString on_start_substep eventOut MFString on_start_new_substep eventOut MFString on_event_out eventOut SFInt32 on_vcr_state eventOut SFFloat on_zoom_changed eventOut SFFloat on_proc_fraction_changed eventOut SFFloat on_substep_fraction_changed eventOut SFFloat on_step_fraction_changed eventIn SFTime reinitialize eventIn SFTime reinitialize_step eventIn SFTime reinitialize_substep field SFInt32 oldsubstep 0 field SFInt32 oldstep 0 eventIn SFVec3f set_centerpoint eventIn SFNode set_object eventIn SFNode set_viewpoint exposedField MFFloat avatarSize[0.25,1.6,0.75,0,0,0]exposedField SFInt32 CenterpointSwitch 0 eventIn SFBool sim_reverse eventIn MFFloat set_step_substep_fraction]{PROTO protoSFNode[exposedField SFNode _ NULL]{Group{}}PROTO _ViewPoint[eventOut SFTime bindTime field SFString description \"\" exposedField SFFloat fieldOfView 0.785398 eventOut SFBool isBound exposedField SFBool jump TRUE exposedField SFRotation orientation 0 0 1 0 exposedField SFVec3f position 0 0 10 eventIn SFBool set_bind]{Group{}}PROTO _navigation_central[exposedField MFFloat avatarSize[0.25,1.6,0.75]exposedField SFVec3f position 0 0 0 exposedField SFVec3f position2 0 0 0 exposedField SFRotation orientation 1 0 0 1.40877 eventIn SFVec3f set_centerpoint eventIn SFNode set_object eventIn SFNode set_viewpoint exposedField SFInt32 CenterpointSwitch -1 exposedField SFBool jump FALSE exposedField SFVec3f centerpoint 0 0 0]{PROTO _[exposedField SFVec3f centerpoint 0 0 0]{Group{}}Group{children[Switch{choice[DEF TR Transform{children[Group{children[Shape{appearance Appearance{material Material{emissiveColor 1 1 0}}geometry IndexedLineSet{coord Coordinate{point[-1 0 0,1 0 0,0 -1 0,0 1 0,0 0 -1,0 0 1]}coordIndex[0,1,-1,2,3,-1,4,5,-1]}}Shape{appearance Appearance{material Material{ambientIntensity 0.08 diffuseColor 0.6 0.17 0.21 emissiveColor 0.09 0.02 0.03 shininess 0.48 specularColor 0.82 0.23 0.23 transparency 0.3}}geometry Sphere{radius 0.01}}]}]}]whichChoice IS CenterpointSwitch}DEF TR3 Transform{children[DEF PS ProximitySensor{size 100000 100000 100000}]}DEF NI NavigationInfo{avatarSize IS avatarSize type[\"ANY\",\"WALK\"]}DEF VP1 Viewpoint{jump IS jump orientation IS orientation position IS position}DEF VP2 Viewpoint{jump IS jump orientation IS orientation position IS position2}DEF S Script{url \"javascript: navigationscript = this; function initialize(){ni.set_bind=true; face.centerpoint = new SFVec3f(ni.avatarSize[3],ni.avatarSize[4],ni.avatarSize[5]);TR.translation = face.centerpoint;}function set_avatarSize(value){face.centerpoint = new SFVec3f(value[3],value[4],value[5]);TR.translation = face.centerpoint;}function set_viewpoint(value){idx = (idx+1) % 2;vp[idx].orientation = value.orientation;vp[idx].position = value.position;vp[idx].set_bind = true;}function set_centerpoint(value){dst = value;change = true;}function set_p(value){vpp = value;}function set_o(value){vpo = value;}function eventsProcessed(){if(change){change = false;TR.translation = dst;face.centerpoint = dst;controlscript.center = dst; var i; for(i=0;i<3;i++) ni.avatarSize[3+i]= dst[i]; ni.set_bind=true; idx = (idx+1) % 2;vp[idx].orientation = vpo;var n = vpo.multVec(new SFVec3f(0,0,-1));var d = (dst.x * n.x + dst.y * n.y + dst.z * n.z - n.dot(vpp)) / n.length();vp[idx].position = vpo.multVec(new SFVec3f(0,0,1)).multiply(d).add(dst);vp[idx].set_bind = true;}}function set_object(value){var bb = value.getBBox(); if(value != null){var i;for(i=0;i<3;i++) dst[i]= (bb[0][i]+bb[1][i])/2;change = true;}}function V3(value){var ln=Math.sqrt((value.subtract(TR.translation)).length()/6+.1);Scl=new SFVec3f(ln,ln,ln);}function V32(){if(TR3.translation.x==0) TR3.translation.x=.001;else TR3.translation.x=0;}\" field SFNode face DEF FACE _{centerpoint IS centerpoint}eventIn MFFloat set_avatarSize eventIn SFVec3f V3 eventIn SFVec3f V32 eventOut SFVec3f Scl field SFNode TR USE TR field SFNode TR3 USE TR3 eventIn SFNode set_object IS set_object field MFNode vp[USE VP1 USE VP2]field SFNode ni USE NI eventIn SFVec3f set_p eventIn SFRotation set_o eventIn SFVec3f set_centerpoint IS set_centerpoint eventIn SFNode set_viewpoint IS set_viewpoint field SFVec3f dst 0 0 0 field SFVec3f vpp 0 0 0 field SFRotation vpo 0 0 1 0 field SFBool change FALSE field SFInt32 idx 0}]}ROUTE TR.translation TO S.V32 ROUTE NI.avatarSize TO S.set_avatarSize ROUTE PS.position_changed TO S.set_p ROUTE PS.position_changed TO S.V3 ROUTE S.Scl TO TR.scale ROUTE PS.orientation_changed TO S.set_o}DEF CONTROLS_SWITCH Switch{choice[Group{children[DEF Simulation_environment Group{children[DEF BaseNavigation _navigation_central{avatarSize IS avatarSize position 2.07545 2.94011 -3.74856 position2 1.79903 2.67255 -3.79413 orientation -0.341284 0.906356 0.249086 1.35588 CenterpointSwitch IS CenterpointSwitch centerpoint -1.99974e-005 1.64445 -4.41302 set_centerpoint IS set_centerpoint set_object IS set_object set_viewpoint IS set_viewpoint}DEF BaseViewpoint1 _ViewPoint{jump FALSE orientation -0.0369923 0.997533 0.0596659 1.90355 position 2.86986 3.53167 7.07428}DEF BaseViewpoint2 _ViewPoint{}Sound{}]}DEF HUD_Controls Group{children[DEF ControlBar Transform{children[Collision{children[DEF HUDTrnsfrm Transform{children[Transform{children[DEF XYZSW Switch{choice[Group{children[DEF SS SphereSensor{enabled FALSE}DEF T Transform{children[DEF XYZTR2 Transform{children[Transform{children IS externalAxes}]rotation -0.402722 0.869396 0.286296 -1.37088}]rotation 0.704574 -0.708973 0.030528 0.437745 scale 1.5 1.5 1.5 translation 0.05 0.048 -0.162}]}]whichChoice 0}DEF ZOOMSW Switch{choice[Transform{children[Transform{children[Transform{children[Transform{children[Shape{appearance DEF AppZoom Appearance{material Material{diffuseColor 0 0 0}}geometry IndexedFaceSet{color Color{color[1 1 1,0.502 0.502 0.7529,0.502 0.502 0.7529]}coord Coordinate{point[0.03496 -0.314 0,-0.01207 0.314 0,0.03496 0.314 0]}colorIndex[0,2,1,-1]coordIndex[0,2,1,-1]}}]translation -0.005111 -0.009789 0}]rotation 0 0 1 -1.57 scale 1 1.2 1 translation -0.022 0 0}Transform{children[DEF ZoomMover Transform{children[Transform{children[DEF Tooltip_SW Switch{choice[Transform{children[Transform{children[Shape{appearance Appearance{material Material{diffuseColor 1 1 0.8}}geometry IndexedFaceSet{coord Coordinate{point[0.5 0.15 0,0.5 -0.15 0,-0.5 -0.15 0,-0.5 0.15 0]}colorPerVertex FALSE coordIndex[3,2,1,0,-1]}}]translation 0 0.06 -0.1}Shape{appearance Appearance{material Material{diffuseColor 0 0 0}}geometry Text{string \"Zoom\" fontStyle FontStyle{family[\"Tahoma\",\"Helvetica\",\"Arial\"]justify \"MIDDLE\" leftToRight TRUE size 0.3 style \"\"}}}]scale 0.139 0.167 0.125 translation 0.045 0.035 -0.1}]}Transform{children[Shape{appearance USE AppZoom geometry IndexedFaceSet{color DEF ZoomMoverColor Color{color[0.502 0.502 0.7529,0 0 0,0 0 0,0.502 0.502 0.7529,1 1 1,0.502 0.502 0.7529,0.502 0.502 0.7529,0.502 0.502 0.7529,1 1 1]}coord Coordinate{point[-0.02107 3.059e-005 0.0432,0.02935 -3.059e-005 -0.04554,-0.008597 -3.059e-005 -0.04554,-0.01168 3.059e-005 0.03973,0.04364 -3.059e-005 -0.05367,-0.0207 2.386e-005 0.04327,-0.00834 -2.535e-005 -0.04609,0.005336 -3.059e-005 -0.0536,0.03044 1.346e-005 -0.04616]}colorIndex[0,1,2,-1,3,4,5,-1,6,4,7,-1,8,4,6,-1,5,4,8,-1]coordIndex[0,1,2,-1,3,4,5,-1,6,4,7,-1,8,4,6,-1,5,4,8,-1]}}]rotation -1 0 0 -1.571 translation 0.00458 -0.02003 0.02}]translation -0.005 0.015 0}]translation 0.0623099 0 0}DEF ZoomSence PlaneSensor{autoOffset FALSE}DEF ZoomClick TouchSensor{}DEF XYZScript Script{url \"javascript: function activeZoom(value){if(value)AppZoom.material.transparency=0;else AppZoom.material.transparency=.8;}function set_orientation(value){tr.rotation = value.inverse();}function overZoom(value){over=value;swtt();}function pressedZoom(value){pressed=value;swtt();}function swtt(){if(over){if(!pressed)ToolTipSW.whichChoice=0;else ToolTipSW.whichChoice=-1;}else ToolTipSW.whichChoice=-1;}\" directOutput TRUE eventIn SFBool overZoom eventIn SFBool pressedZoom eventIn SFBool activeZoom field SFNode ToolTipSW USE Tooltip_SW field SFBool over FALSE field SFBool pressed FALSE field SFNode tr USE XYZTR2 eventIn SFRotation set_orientation field SFNode ASize USE BaseNavigation field SFNode AppZoom USE AppZoom}]translation -0.03 0 0}]scale 0.012 0.01 0.01 translation 0 -0.004 0}]translation 0 0 -0.0125}]whichChoice -1}]}]}]collide FALSE}]rotation -0.402722 0.869396 0.286296 1.37088 translation 1.92601 3.15088 -3.74299}DEF PSens ProximitySensor{size 1e+007 1e+007 1e+007}]}DEF VCR_CONTROL_SCRIPT Script{field SFNode me USE VCR_CONTROL_SCRIPT eventOut SFNode ControlScript field SFString version_num \"2.073Reversed\" eventOut MFString on_start_substep IS on_start_substep eventOut MFString on_start_new_substep IS on_start_new_substep eventOut MFString on_event_out IS on_event_out eventOut SFInt32 on_vcr_state IS on_vcr_state eventOut SFFloat on_zoom_changed IS on_zoom_changed eventOut SFFloat on_proc_fraction_changed IS on_proc_fraction_changed eventOut SFFloat on_substep_fraction_changed IS on_substep_fraction_changed eventOut SFFloat on_step_fraction_changed IS on_step_fraction_changed eventIn SFBool set_ui_smoothcontrol IS set_ui_smoothcontrol eventIn SFBool set_ui_axis IS set_ui_axis eventIn SFBool set_ui_zoom IS set_ui_zoom eventIn SFBool set_ui_vcr IS set_ui_vcr eventIn SFTime vcr_play IS vcr_play eventIn SFTime vcr_stop IS vcr_stop eventIn SFTime vcr_pause IS vcr_pause eventIn SFTime vcr_forward IS vcr_forward eventIn SFTime vcr_backward IS vcr_backward eventIn SFTime vcr_next IS vcr_next eventIn SFTime vcr_previous IS vcr_previous eventIn SFString vcr_goto IS vcr_goto eventIn SFString vcr_set_position IS vcr_set_position eventIn SFFloat vcr_set_fraction IS vcr_set_fraction eventIn SFFloat set_speed_ratio IS set_speed_ratio eventIn SFBool set_stop_by_substep IS set_stop_by_substep eventIn SFBool set_stop_by_step IS set_stop_by_step eventIn SFTime zoom_reset IS zoom_reset eventIn SFFloat zoom_set_delta IS zoom_set_delta eventIn SFFloat zoom_set_level IS zoom_set_level eventIn SFFloat vcr_set_proc_fraction IS vcr_set_proc_fraction eventIn SFFloat vcr_set_step_fraction IS vcr_set_step_fraction eventIn SFFloat set_substep_fraction IS set_substep_fraction eventIn SFFloat set_procedure_fraction IS set_procedure_fraction eventIn SFFloat set_step_fraction IS set_step_fraction eventIn MFFloat now_step_substep_fraction IS now_step_substep_fraction eventIn MFFloat set_step_substep_fraction IS set_step_substep_fraction eventIn SFBool set_ignore_viewpoints IS set_ignore_viewpoints eventIn SFTime reinitialize IS reinitialize eventIn SFTime reinitialize_step IS reinitialize_step eventIn SFTime reinitialize_substep IS reinitialize_substep eventIn SFBool sim_reverse IS sim_reverse field SFBool isReversed FALSE field MFNode CommandsSetID[]field SFBool isFinal FALSE eventIn SFFloat ScrollSlider eventIn SFFloat time_fraction1 eventIn SFFloat time_fraction2 eventIn SFBool cycleTime1 eventIn SFBool cycleTime2 eventIn SFTime cycleTimeDelay eventIn SFTime cycleTimeFast eventIn SFBool cycleTimeVP1 eventIn SFBool cycleTimeVP2 eventIn SFTime onVCRTimer eventIn SFVec3f PS_pos eventIn SFRotation PS_rot eventIn SFVec3f PosZoomSlider eventIn SFBool slActive field MFFloat EventsFraction[]field MFInt32 EventsNum[]field SFInt32 EventsCount -1 field SFFloat OldEventFraction -1 field SFFloat NextEventFraction 1000 field SFInt32 NextEventNum -1 field SFNode STime TimeSensor{loop TRUE enabled TRUE cycleInterval 10000}field SFNode OP protoSFNode{_ IS procedure}field SFInt32 step 0 field SFInt32 substep 0 field SFFloat phase 0 field SFInt32 NCmds 0 field MFNode Timers[DEF AnimationTimer1 TimeSensor{cycleInterval 5 stopTime 1},DEF AnimationTimer2 TimeSensor{cycleInterval 5 stopTime 1},DEF VPTimer1 TimeSensor{cycleInterval 3 stopTime 1},DEF VPTimer2 TimeSensor{cycleInterval 3 stopTime 1},DEF ExtraFastTimer TimeSensor{cycleInterval .001 enabled FALSE loop TRUE}DEF DelayTimer TimeSensor{cycleInterval .001 enabled FALSE loop TRUE}]field SFInt32 activeVPtimer 2 field MFInt32 CSteps[0,0,0]field SFInt32 isDelay 0 field SFInt32 activeTimer 0 field SFTime cycleInterval 5 field SFTime currentTime -1 field SFFloat timeCompression 1 field SFInt32 paused 0 field SFFloat paused_fr 0 field SFFloat val 0 field MFFloat StepDuration[]field MFVec2f TaskDuration[]field SFInt32 isScroll 0 field MFNode VP[USE BaseViewpoint1,USE BaseViewpoint2]field SFInt32 activeVP 1 field SFNode PSens USE PSens field SFInt32 VPmodification 0 field SFTime intervalVP 3.5 field MFFloat avatarSz[.25,1.6,.75,0,0,0]field SFNode Navigation USE BaseNavigation field SFBool onestep_mode FALSE field SFInt32 selectedTask 1 field SFInt32 bindAllVPs 0 field SFInt32 oldsubstep IS oldsubstep field SFInt32 oldstep IS oldstep field SFInt32 alertStep -1 field SFInt32 alertSubStep -1 field SFInt32 alertOut 0 field SFBool stop_every_substep FALSE field SFBool stop_every_step FALSE field SFInt32 current_mode 0 field SFInt32 VPnum 0 field MFVec3f VPperiod[]field SFInt32 VP_enabled 0 field SFInt32 fragment_type 0 field SFString lastID \"\" field SFFloat simfraction 0 field SFNode XYZSW USE XYZSW field SFNode ZOOMSW USE ZOOMSW field SFInt32 simsteps 0 field SFNode ZoomSence USE ZoomSence field SFVec3f center 0 0 0 field SFVec3f VPposition 0 0 10 eventIn SFFloat setMinZoom IS setMinZoom eventIn SFFloat setMaxZoom IS setMaxZoom field SFFloat maxZoom 10 field SFFloat minZoom .4 field SFFloat currentPositon 0 field SFNode ZoomMover USE ZoomMover field SFFloat xPos .5 field SFFloat xMin -.32 field SFFloat xMax .32 field SFFloat lastFr 0 field SFFloat distanceVP 0 field SFFloat distance 0 field SFVec3f ortVP 0 0 0 field SFNode VCRTimer DEF VCRTimer TimeSensor{loop TRUE enabled FALSE cycleInterval .001}field MFInt32 cmd_stack[]field SFString last_goto_val \"\" field SFString last_set_position_val \"\" field SFFloat last_fraction_val 0 field SFFloat last_speed_ratio 0 field SFFloat last_proc_fraction_val 0 field SFFloat last_step_fraction_val 0 field SFInt32 WrnNum -1 field SFInt32 totalStop 0 field SFInt32 StepsTrueLength 0 field SFBool blockCommands FALSE field SFBool blockViewpoints FALSE field SFBool overlap_flag FALSE field SFInt32 overlap_mode 0 field SFFloat maxDim 0 field SFFloat bias .001 field SFBool alwaysWarning FALSE field SFBool lastCycleTm FALSE field SFFloat lastTmFr -1 directOutput TRUE url \"javascript: /* version_num 2.073 Reversed*/ ControlScript=me; controlscript = this; function initialize(){alwaysWarning=false;blockViewpoints=true;overlap_flag=false;stop_every_substep=false;stop_every_step=false;Browser.addRoute(navigationscript.face, 'centerpoint', me, 'PS_pos'); if(OP._!=null)on_load();}function setMinZoom(value){minZoom=value;}function setMaxZoom(value){maxZoom=value;}function onVCRTimer(value){if(blockCommands)cmd_stack.length=0; if(cmd_stack.length>0){if(cmd_stack[0]==1)_vcr_play(); if(cmd_stack[0]==2)_vcr_stop(); if(cmd_stack[0]==3)_vcr_pause(); if(cmd_stack[0]==4)_vcr_forward(); if(cmd_stack[0]==5)_vcr_backward(); if(cmd_stack[0]==6)_vcr_next(); if(cmd_stack[0]==7)_vcr_previous(); if(cmd_stack[0]==8)_vcr_goto(last_goto_val); if(cmd_stack[0]==9)_set_speed_ratio(last_speed_ratio); if(cmd_stack[0]==10)_vcr_set_fraction(last_fraction_val); if(cmd_stack[0]==11)_vcr_set_proc_fraction(last_proc_fraction_val); if(cmd_stack[0]==12)_vcr_set_step_fraction(last_step_fraction_val); if(cmd_stack[0]==13)_vcr_set_position(last_set_position_val);var ln = cmd_stack.length-1; var d; for(d=1;d<=ln;d++)cmd_stack[d-1]=cmd_stack[d];cmd_stack.length=ln;}else VCRTimer.enabled=false;}function add_to_stack(value){cmd_stack[cmd_stack.length]=value;VCRTimer.enabled=true;}function vcr_play(){add_to_stack(1);}function vcr_stop(){totalStop=1;add_to_stack(3);add_to_stack(2);}function vcr_pause(){totalStop=1;add_to_stack(3);}function vcr_forward(){totalStop=1;add_to_stack(3);add_to_stack(4);}function vcr_backward(){totalStop=1;add_to_stack(3);add_to_stack(5);}function vcr_next(){totalStop=1;add_to_stack(3);add_to_stack(6);}function vcr_previous(){totalStop=1;add_to_stack(3);add_to_stack(7);}function vcr_goto(value){totalStop=1;add_to_stack(3);last_goto_val=value;add_to_stack(8);}function vcr_set_position(value){totalStop=1;add_to_stack(3);last_set_position_val=value;add_to_stack(13);}function set_speed_ratio(value){last_speed_ratio=value;add_to_stack(9);}function vcr_set_fraction(value){totalStop=1;add_to_stack(3);last_fraction_val=value;add_to_stack(10);}function vcr_set_step_fraction(value){totalStop=1;add_to_stack(3);last_step_fraction_val=value;add_to_stack(12);}function vcr_set_proc_fraction(value){totalStop=1;add_to_stack(3);last_proc_fraction_val=value;add_to_stack(11);}function reinitialize(){overlap_flag=true;overlap_mode=0;on_load();}function reinitialize_step(){overlap_flag=true;overlap_mode=1;on_load();}function reinitialize_substep(){overlap_flag=true;overlap_mode=2;on_load();}function sim_reverse(value){isReversed=value;}function on_load(){oldstep=0;oldsubstep=0;selectedTask=1;fragment_type=0;TaskDuration.length=0;simsteps=0; var z, g, h, j; for(z=0;z<OP._.steps.length;z++)if(OP._.steps[z].substeps.length==0)OP._.steps[z].simulate=false;delete_Steps(); if(StepsTrueLength>0){blockCommands=false;lastID=OP._.id; for(z=0;z<StepsTrueLength;z++)if(OP._.steps[z].simulate){TaskDuration[z]=new SFVec2f(simsteps,simsteps+1);simsteps++;}else TaskDuration[z]=new SFVec2f(-simsteps,-(simsteps+1)); for(z=0;z<StepsTrueLength;z++)TaskDuration[z]=TaskDuration[z].multiply(1/simsteps);check_overlap(); if(overlap_mode==0){start();alertStep=-1;alertSubStep=-1;}else{alertStep=-1;alertSubStep=-1;presetSubstep();oldstep=step;oldsubstep=substep;}}else{blockCommands=true; if(OP._.steps.length>0){for(z=0;z<OP._.steps.length;z++)if(OP._.steps[z].substeps.length==0)return;check_overlap();step=OP._.steps.length-1;substep=OP._.steps[OP._.steps.length-1].substeps.length-1;paused_fr=1;setPhase(); for(g=OP._.steps.length-1;g>=0;g--){for(h=OP._.steps[g].substeps.length-1;h>=0;h--){for(j=OP._.steps[g].substeps[h].commands.length-1;j>=0;j--){if(OP._.steps[g].substeps[h].commands[j].attributeName=='set_viewpoint'){setVP(g,h,j);return;}}}}}}}function check_overlap(){}function delete_Steps(){StepsTrueLength=OP._.steps.length; var z; for(z=OP._.steps.length-1;z>=0;z--){if(!OP._.steps[z].simulate)StepsTrueLength=z;else return;}}function out_on_zoom(){on_zoom_changed=Math.round(lastFr*100000)/100000;}function PosZoomSlider(value){xPos=currentPositon+value.x; if(xPos<xMin)xPos=xMin; if(xPos>xMax)xPos=xMax;ZoomMover.translation=new SFVec3f(xPos,0,0);lastFr=(xPos-xMin)/(xMax-xMin);out_on_zoom();setzoomVP(lastFr);}function setzoomVP(value){ortVP=ortVP.normalize();var V3_0 = VPposition.subtract(ortVP.multiply(maxZoom-distance));var V3_2 = VPposition.subtract(ortVP.multiply(minZoom-distance));navigationscript.vp[navigationscript.idx].position = V3_0.add((V3_2.subtract(V3_0)).multiply(value));}function slActive(value){if(!value)currentPositon=xPos;}function zoom_reset(){if(VPmodification!=1){lastFr=1-(distanceVP-minZoom)/(maxZoom-minZoom);setzoomVP(lastFr);}}function zoom_set_level(value){if(VPmodification!=1){lastFr=value; if(lastFr<0)lastFr=0; if(lastFr>1)lastFr=1;setzoomVP(lastFr);}}function zoom_set_delta(value){if(VPmodification!=1){lastFr+=.2*value; if(lastFr<0)lastFr=0; if(lastFr>1)lastFr=1;setzoomVP(lastFr);}}function set_stop_by_substep(value){stop_every_substep=value;}function set_stop_by_step(value){stop_every_step=value;onestep_mode=value;}function _vcr_play(){totalStop=0; if(!Timers[activeTimer].isActive){play();}}function _vcr_stop(){stop();_vcr_goto(lastID);}function _vcr_pause(){pause();}function _vcr_forward(){forward();}function _vcr_backward(){backward();}function _vcr_next(){next();}function _vcr_previous(){prev();}function _vcr_goto(value){alertStep=-1; var g, h; if(OP._.id==value){selectedTask=1;fragment_type=0;stop();start();lastID=value;}else{for(g=0;g<StepsTrueLength;g++){if((OP._.steps[g].id==value)&&(OP._.steps[g].simulate)){selectedTask=0;fragment_type=1;onestep_mode=true;stop();setStep(g);lastID=value;return;}}for(g=0;g<StepsTrueLength;g++){if(OP._.steps[g].simulate)for(h=0;h<OP._.steps[g].substeps.length;h++){if(OP._.steps[g].substeps[h].id==value){selectedTask=0;fragment_type=2;stop_every_substep=true;stop();step=g;substep=h;paused_fr=0;presetSubstep();setPhase();lastID=value;return;}}}}}function _vcr_set_position(value){alertStep=-1; var g, h; if(OP._.id==value){selectedTask=1;fragment_type=0;stop();start();lastID=value;}else{for(g=0;g<StepsTrueLength;g++){if((OP._.steps[g].id==value)&&(OP._.steps[g].simulate)){stop();setStep(g);return;}}for(g=0;g<StepsTrueLength;g++){if(OP._.steps[g].simulate)for(h=0;h<OP._.steps[g].substeps.length;h++){if(OP._.steps[g].substeps[h].id==value){stop();step=g;substep=h;paused_fr=0;presetSubstep();setPhase();return;}}}}}function _set_speed_ratio(value){if(value>0){timeCompression=value;}}function set_substep_fraction(value){_vcr_set_fraction(value);}function _vcr_set_fraction(value){paused_fr=value; if(paused_fr>1)paused_fr=1; if(paused_fr<0)paused_fr=0;setPhase();}function set_ignore_viewpoints(value){blockViewpoints=value; if(!value)VP[activeVP].set_bind=true;}function set_ui_axis(value){if(value)XYZSW.whichChoice=0;else XYZSW.whichChoice=-1;}function set_ui_zoom (value){if(value)ZOOMSW.whichChoice=0;else ZOOMSW.whichChoice=-1;}function cycleTimeVP1(value){if(activeVPtimer==2)cycleTimeVP(value);}function cycleTimeVP2(value){if(activeVPtimer==3)cycleTimeVP(value);}function cycleTimeVP(value){if((VPmodification==1)&&(!value)){VPmodification=0;play2();}}function VPmodification0(){VPmodification=0;Timers[activeVPtimer].stopTime=STime.time;}function delayVP(){currentTime=STime.time; if(Timers[activeVPtimer].isActive){Timers[activeVPtimer].stopTime=STime.time;activeVPtimer=(activeVPtimer==2)?3:2;}Timers[activeVPtimer].cycleInterval=intervalVP;Timers[activeVPtimer].startTime=currentTime;Timers[activeVPtimer].stopTime=currentTime+intervalVP;}function setPosZoomSlider(value){lastFr=1-(value-minZoom)/(maxZoom-minZoom); if(lastFr<0)lastFr=0; if(lastFr>1)lastFr=1;xPos=lastFr*(xMax-xMin)+xMin;out_on_zoom();currentPositon=xPos;ZoomMover.translation=new SFVec3f(xPos,0,0);VPposition=navigationscript.vp[navigationscript.idx].position;}function PS_pos(value){check_position(); if(!ZoomSence.isActive){distance=(navigationscript.face.centerpoint.subtract(PSens.position_changed)).length();ortVP=navigationscript.face.centerpoint.subtract(PSens.position_changed);setPosZoomSlider(distance);}}function PS_rot(value){check_position();}function check_position(){if(VPmodification==1){if(maxDim<PSens.position_changed.length()){maxDim=PSens.position_changed.length();bias=maxDim/10000+.001;}var tmpV3=(VP[activeVP].position).subtract(PSens.position_changed);var tmpRot=(VP[activeVP].orientation).multiply((PSens.orientation_changed).inverse()); if((tmpV3.length()<bias)&&(Math.abs(tmpRot.angle)<.001)){VPmodification0();play2();}}}function check_position0(){if(VPmodification==1){if(maxDim<PSens.position_changed.length()){maxDim=PSens.position_changed.length();bias=maxDim/10000+.001;}var tmpV3=(VP[activeVP].position).subtract(PSens.position_changed);var tmpRot=(VP[activeVP].orientation).multiply((PSens.orientation_changed).inverse()); if((tmpV3.length()<bias)&&(Math.abs(tmpRot.angle)<.001)){VPmodification0();}}}function checkCondition(){isFinal=(simfraction==1); if(current_mode==0){if((simfraction!=0)&&(simfraction!=1)){current_mode=2;on_vcr_state=current_mode;return;}}if(current_mode==2){if((simfraction==0)||(simfraction==1)){current_mode=0;on_vcr_state=current_mode;return;}}}function setCondition(value){val0=value;isFinal=(simfraction==1); if((value==0)&&(simfraction>0)&&(simfraction<1))val0=2; if(current_mode!=val0){current_mode=val0;on_vcr_state=current_mode; if(current_mode==1)ZoomSence.enabled=false;else ZoomSence.enabled=true;}}function setVP(v1,v2,v3){if(!blockViewpoints){activeVP=(VP[0].isBound)?1:0; if(isScroll==1)VP[activeVP].jump=true;else VP[activeVP].jump=false;distanceVP=(navigationscript.face.centerpoint.subtract(OP._.steps[v1].substeps[v2].commands[v3].position)).length();center=OP._.steps[v1].substeps[v2].commands[v3].center;minZoom=OP._.steps[v1].substeps[v2].commands[v3].zoom_limits[0];maxZoom=OP._.steps[v1].substeps[v2].commands[v3].zoom_limits[1];VP[activeVP].orientation=OP._.steps[v1].substeps[v2].commands[v3].orientation;VP[activeVP].position=OP._.steps[v1].substeps[v2].commands[v3].position;VP[activeVP].set_bind=true;avatarSz[3]=OP._.steps[v1].substeps[v2].commands[v3].center.x;avatarSz[4]=OP._.steps[v1].substeps[v2].commands[v3].center.y;avatarSz[5]=OP._.steps[v1].substeps[v2].commands[v3].center.z;}}function bindVP(){var z, h, j; for(z=VPperiod.length-1;z>=0;z--)if((VPperiod[z].x<=paused_fr)&&(VPperiod[z].y>=paused_fr)){VPnum=VPperiod[z].z;setVP(step,substep,VPnum);VP_enabled=1;return;}VP_enabled=0; if(isScroll==1){for(h=substep-1;h>=0;h--){var endVP=-1;for(j=0;j<OP._.steps[step].substeps[h].commands.length;j++){if((OP._.steps[step].substeps[h].commands[j].attributeName=='set_viewpoint')&&(OP._.steps[step].substeps[h].commands[j].period[1]>=endVP)){VPnum=j;endVP=OP._.steps[step].substeps[h].commands[j].period[1];}}if(endVP>=0){setVP(step,h,VPnum);VPnum=-1;return;}}VPnum=-1;}}function presetSubstep(){var z; if(StepsTrueLength>step){paused=0;NCmds=OP._.steps[step].substeps[substep].commands.length;cycleInterval=OP._.steps[step].substeps[substep].duration/timeCompression;VPperiod.length=0;var cntV=0;WrnNum=-1;EventsCount=-1;NextEventFraction=1000;NextEventNum=-1;EventsNum.length=0;EventsFraction.length=0; for(z=0;z<NCmds;z++){if(OP._.steps[step].substeps[substep].commands[z].attributeName=='set_viewpoint'){VPperiod[cntV].x=OP._.steps[step].substeps[substep].commands[z].period[0];VPperiod[cntV].y=OP._.steps[step].substeps[substep].commands[z].period[1];VPperiod[cntV].z=z; if((VPperiod[cntV].x<=paused_fr)&&(VPperiod[cntV].y>=paused_fr))VPnum=z;cntV++;}if(OP._.steps[step].substeps[substep].commands[z].attributeID==-2){if(WrnNum==-1)WrnNum=z;EventsCount++;EventsNum[EventsCount]=z;EventsFraction[EventsCount]=OP._.steps[step].substeps[substep].commands[z].period[0]; if((EventsFraction[EventsCount]<NextEventFraction)&&(EventsFraction[EventsCount]>paused_fr)){NextEventFraction=EventsFraction[EventsCount];NextEventNum=EventsCount;}}}StepDuration.length=0;StepDuration[0]=0; for(z=1;z<=OP._.steps[step].substeps.length;z++)StepDuration[z]=StepDuration[z-1]+OP._.steps[step].substeps[z-1].duration; for(z=1;z<=OP._.steps[step].substeps.length;z++)StepDuration[z]=StepDuration[z]/StepDuration[OP._.steps[step].substeps.length];setSlidersPos(paused_fr);bindVP(); if((isScroll==1)||(alwaysWarning))OutID();}}function start(){onestep_mode=false; var q; for(q=0;q<StepsTrueLength;q++)if(OP._.steps[q].simulate){setStep(q);return;}}function forward(){stop(); var q; for(q=step+1;q<StepsTrueLength;q++)if(OP._.steps[q].simulate){setStep(q);return;}substep=OP._.steps[step].substeps.length-1;paused_fr=1;presetSubstep();setPhase();}function backward(){stop(); var q; if((substep>0)||(paused_fr>0)){substep=0;paused_fr=0;presetSubstep();setPhase();return;}for(q=step-1;q>=0;q--)if(OP._.steps[q].simulate){setStep(q);return;}start();}function next(){stop(); if(OP._.steps[step].substeps.length>substep+1)setSubStep(substep+1);else{paused_fr=1;presetSubstep();setPhase();}}function prev(){stop(); if(paused_fr>0){paused_fr=0;presetSubstep();setPhase();return;}if(substep>0)setSubStep(substep-1);}function stop(){if(current_mode==1){if(Timers[activeTimer].isActive){Timers[activeTimer].stopTime=STime.time;activeTimer=(activeTimer==0)?1:0;}setCondition(0);VPmodification0();}}function pause(){if((paused==0)&&(Timers[activeTimer].isActive)){paused=1;paused_fr=Timers[activeTimer].fraction_changed+paused_fr;phase=paused_fr;}Timers[activeTimer].stopTime=STime.time;totalStop=1;setCondition(0);VPmodification0();}function set_procedure_fraction(value){_vcr_set_proc_fraction(value);}function _vcr_set_proc_fraction(value){var val0=value; if(value>1)val0=1; if(value<0)val0=0;ScrollTask(val0);setSlidersPos(paused_fr);checkCondition();}function set_step_fraction(value){_vcr_set_step_fraction(value);}function _vcr_set_step_fraction(value){var val0=value; if(value>1)val0=1; if(value<0)val0=0;ScrollStep(val0);setSlidersPos(paused_fr);checkCondition();}function ScrollSlider(value){if(!blockCommands){OldEventFraction=-1;simfraction=value; if(fragment_type==0)ScrollTask(value);else{if(fragment_type==1)ScrollStep(value);else if(fragment_type==2)ScrollSubstep(value);}checkCondition();}}function ScrollTask(value){scrll(); isScroll=1; val=value; var z; if((TaskDuration[step].x<=val)&&(val<=TaskDuration[step].y))TaskToStep(0);else{var iStep=-1; for(z=0;z<StepsTrueLength;z++){if((TaskDuration[z].x<=val)&&(val<=TaskDuration[z].y))iStep=z;}if(iStep!=-1)step=iStep;substep=0;StepDuration.length=0;StepDuration[0]=0;for(z=1;z<=OP._.steps[step].substeps.length;z++)StepDuration[z]=StepDuration[z-1]+OP._.steps[step].substeps[z-1].duration;for(z=1;z<=OP._.steps[step].substeps.length;z++)StepDuration[z]=StepDuration[z]/StepDuration[OP._.steps[step].substeps.length];TaskToStep(1);}isScroll=0;}function TaskToStep(value){val=(val-TaskDuration[step].x)/(TaskDuration[step].y-TaskDuration[step].x); var z; if((value==0)&&((StepDuration[substep]<=val)&&(val<=StepDuration[substep+1]))){val=(val-StepDuration[substep])/(StepDuration[substep+1]-StepDuration[substep]);paused_fr=val;time_fraction(0);}else{var iSubStep0=-1;for(z=1;z<=OP._.steps[step].substeps.length;z++)if((StepDuration[z-1]<=val)&&(val<=StepDuration[z]))iSubStep0=z-1; if(iSubStep0!=-1){substep=iSubStep0;val=(val-StepDuration[substep])/(StepDuration[substep+1]-StepDuration[substep]);paused_fr=val;}else{substep=0;paused_fr=0;}bindAllVPs=value;presetSubstep();setPhase();bindAllVPs=0;}}function ScrollStep(value){var smfr0=simfraction;scrll();isScroll=1;val=value; var z; if((StepDuration[substep]<=val)&&(val<=StepDuration[substep+1])){val=(val-StepDuration[substep])/(StepDuration[substep+1]-StepDuration[substep]);paused_fr=val;time_fraction(0); if(value==0)bindVP();}else{var iSubStep=-1;for(z=1;z<=OP._.steps[step].substeps.length;z++){if((StepDuration[z-1]<=val)&&(val<=StepDuration[z]))iSubStep=z-1;}if(iSubStep!=-1){substep=iSubStep;paused_fr=(val-StepDuration[substep])/(StepDuration[substep+1]-StepDuration[substep]);presetSubstep();setPhase();bindVP();}}isScroll=0;simfraction=smfr0;}function ScrollSubstep(value){scrll();isScroll=1;paused_fr=value;time_fraction(0); if(value==0)bindVP();isScroll=0;}function scrll(){stop(); if(paused==1){totalStop=0;paused=0;}}function setSlidersPos(value){var val2=StepDuration[substep]+value*(StepDuration[substep+1]-StepDuration[substep]);simfraction=TaskDuration[step].x+val2*(TaskDuration[step].y-TaskDuration[step].x);OutSubstep();on_substep_fraction_changed=value;on_step_fraction_changed=val2;on_proc_fraction_changed=simfraction; if(isScroll==0){if(fragment_type==1)simfraction=val2; if(fragment_type==2)simfraction=value;}}function eventsProcessed(){if(lastCycleTm){cycleTime(false);lastTmFr=-1;lastCycleTm=false;}else{if(lastTmFr>=0){time_fraction(lastTmFr);}lastTmFr=-1;}}function time_fraction1(value){if(activeTimer==0)time_fraction0(value);}function time_fraction2(value){if(activeTimer==1)time_fraction0(value);}function time_fraction0(value){if(paused==0)lastTmFr=value;}function time_fraction(value){var z; if(paused==0){val=(isReversed)?1-value:value;phase=val;for(z=0;z<NCmds;z++)OP._.steps[step].substeps[substep].commands[z].time_fraction=val;}}function cycleTime1(value){if(activeTimer==0)cycleTime0(value);}function cycleTime2(value){if(activeTimer==1)cycleTime0(value);}function cycleTime0(value){if(!value)lastCycleTm=true;}function cycleTime(value){var q; if((!value)&&(paused==0)&&(totalStop==0)){CheckEventOnCycle();Timers[activeTimer].stopTime=STime.time; if(!isReversed){if(OP._.steps[step].substeps.length<=substep+1){if(StepsTrueLength<=step+1){paused_fr=1;phase=paused_fr;}else{if(OP._.steps[step+1].simulate){substepfinish();step++;substep=0;setOldValues();paused_fr=0;phase=paused_fr;activeTimer=(activeTimer==0)?1:0;presetSubstep();play();return;}else{for(q=step+1;q<StepsTrueLength;q++)if(OP._.steps[q].simulate){setStep(q);activeTimer=(activeTimer==0)?1:0;play();return;}paused_fr=1;phase=paused_fr;}}}else{substepfinish();substep++;setOldValues();paused_fr=0;phase=paused_fr;activeTimer=(activeTimer==0)?1:0;play();return;}}else{if(substep<=0){if(step<=0){paused_fr=0;phase=paused_fr;}else{substepfinish();step--;substep=OP._.steps[step].substeps.length-1;setOldValues();paused_fr=1;phase=paused_fr;activeTimer=(activeTimer==0)?1:0;presetSubstep();play();return;}}else{substepfinish();substep--;setOldValues();paused_fr=1;phase=paused_fr;activeTimer=(activeTimer==0)?1:0;play();return;}}substepfinish();setCondition(0);}}function substepfinish(){var z; var RVal=(isReversed)?0:1;for(z=0;z<NCmds;z++){OP._.steps[step].substeps[substep].commands[z].time_fraction=RVal;}setSlidersPos(1);}function play(){if(!Timers[activeTimer].isActive){presetSubstep();play2();}}function cycleTimeFast(){if((CSteps[0]==1)&&(CSteps[1]==step)&&(CSteps[2]==substep)){Timers[4].enabled=false;CSteps[0]=0;paused_fr=(isReversed)?0:1;phase=paused_fr;setSlidersPos(paused_fr);cycleTime(false);}}function play2(){OutSubstep();OutID();val=paused_fr;setCondition(1);isDelay=1;Timers[5].enabled=true;}function cycleTimeDelay(){if(isDelay==1){Timers[5].enabled=false;isDelay=0;play3();}}function play3(){if(totalStop==0){presetSubstep();CheckEventOnPlay();var timetmp=0;timetmp=(isReversed)?cycleInterval*paused_fr:cycleInterval*(1-paused_fr); if(timetmp<.4){CSteps[0]=1;CSteps[1]=step;CSteps[2]=substep;Timers[4].enabled=true;}else{currentTime=STime.time;Timers[activeTimer].cycleInterval=cycleInterval;Timers[activeTimer].startTime=currentTime;Timers[activeTimer].stopTime=currentTime+cycleInterval*timetmp;}}else{setCondition(0);}}function now_step_substep_fraction(value){stop();overlap_flag=false;on_load();step=value[0];substep=value[1];paused_fr=value[2];presetSubstep();setOldValues();}function set_step_substep_fraction(value){stop();step=value[0];substep=value[1];paused_fr=value[2];presetSubstep();setPhase();}function setStep(value){substep=0;step=value;paused_fr=0;presetSubstep();setPhase();}function setSubStep(value){substep=value;paused_fr=0;presetSubstep();setPhase();}function setPhase(){}function setOldValues(){oldstep=step;oldsubstep=substep;}function OutSubstep(){if((alertSubStep!=substep)||(alertStep!=step)){if((fragment_type==1)&&(OP._.steps[step].id!=''))lastID=OP._.steps[step].id;on_start_new_substep = new MFString(OP._.id,OP._.steps[step].id,OP._.steps[step].substeps[substep].id);on_start_substep = new MFString(OP._.id,OP._.steps[step].id,OP._.steps[step].substeps[substep].id);alertSubStep=substep;alertStep=step;alertOut=0;OldEventFraction=-1;}}function CheckEventOnPlay(){var z, t; if(OldEventFraction==val)return;var CountEvents=0;for(z=0;z<=EventsCount;z++)if(EventsFraction[z]==val){CountEvents++;CommandsSetID.length=CountEvents;CommandsSetID[CountEvents-1]=OP._.steps[step].substeps[substep].commands[EventsNum[z]];}if(CountEvents>0){OldEventFraction=val;OutEventID();NextEventNum=-1;NextEventFraction=100;for(t=0;t<=EventsCount;t++){if((EventsFraction[t]>val)&&(NextEventFraction>EventsFraction[t])){NextEventFraction=EventsFraction[t];NextEventNum=t;}}}else OldEventFraction=-1;}function CheckEventOnCycle(){var z, t; if(NextEventNum>0){var MFStr= new MFString(OP._.steps[step].substeps[substep].commands[EventsNum[NextEventNum]].ID);CommandsSetID.length=1;CommandsSetID[0]=OP._.steps[step].substeps[substep].commands[EventsNum[NextEventNum]];var TmpFraction=1000;var TmpEventNum=-1; for(z=0;z<=EventsCount;z++){TmpEventNum=-1; for(t=0;t<=EventsCount;t++)if((EventsFraction[t]<=1)&&(EventsFraction[t]>NextEventFraction)&&(TmpFraction>EventsFraction[t])&&(t!=NextEventNum)){TmpFraction=EventsFraction[t];TmpEventNum=t;}if(TmpEventNum<0){z=EventsCount;}else{var ln000=MFStr.length;MFStr.length=ln000+1;CommandsSetID.length=ln000+1;MFStr[ln000]=OP._.steps[step].substeps[substep].commands[EventsNum[TmpEventNum]].ID;CommandsSetID[ln000]=OP._.steps[step].substeps[substep].commands[EventsNum[TmpEventNum]];}}OutEventID();}}function OutEventID(){var OutIDMFStr= new MFString(); var z; for(z=0;z<CommandsSetID.length;z++)OutIDMFStr[z]=CommandsSetID[z].ID;on_event_out=OutIDMFStr;}function OutID(){if((WrnNum!=-1)&&(alertOut==0)){if(OP._.steps[step].id!=OP._.steps[step].substeps[substep].commands[WrnNum].ID)on_start_substep = new MFString(OP._.id,OP._.steps[step].id,OP._.steps[step].substeps[substep].commands[WrnNum].ID);alertOut=1;}}\"}]}]whichChoice IS whichChoice}ROUTE PSens.orientation_changed TO VCR_CONTROL_SCRIPT.PS_rot ROUTE PSens.orientation_changed TO ControlBar.rotation ROUTE PSens.orientation_changed TO XYZScript.set_orientation ROUTE ZoomSence.enabled TO ZoomClick.enabled ROUTE ZoomSence.enabled TO XYZScript.activeZoom ROUTE ZoomSence.isActive TO VCR_CONTROL_SCRIPT.slActive ROUTE AnimationTimer2.fraction_changed TO VCR_CONTROL_SCRIPT.time_fraction2 ROUTE AnimationTimer2.isActive TO VCR_CONTROL_SCRIPT.cycleTime2 ROUTE VPTimer1.isActive TO VCR_CONTROL_SCRIPT.cycleTimeVP1 ROUTE ExtraFastTimer.cycleTime TO VCR_CONTROL_SCRIPT.cycleTimeFast ROUTE VPTimer2.isActive TO VCR_CONTROL_SCRIPT.cycleTimeVP2 ROUTE DelayTimer.cycleTime TO VCR_CONTROL_SCRIPT.cycleTimeDelay ROUTE VCRTimer.cycleTime TO VCR_CONTROL_SCRIPT.onVCRTimer ROUTE AnimationTimer1.fraction_changed TO VCR_CONTROL_SCRIPT.time_fraction1 ROUTE AnimationTimer1.isActive TO VCR_CONTROL_SCRIPT.cycleTime1 ROUTE ZoomSence.translation_changed TO VCR_CONTROL_SCRIPT.PosZoomSlider ROUTE ZoomClick.isActive TO XYZScript.pressedZoom ROUTE ZoomClick.isOver TO XYZScript.overZoom ROUTE PSens.position_changed TO VCR_CONTROL_SCRIPT.PS_pos ROUTE PSens.position_changed TO ControlBar.translation}";
    this.COPIER_SYNTAX = 'DEF CORTONA_CARBONCOPIER Script {eventIn SFBool pageSetup eventIn SFBool print field SFString headerText "&bProprietary Commercial Data" field SFString footerText "" field MFString headerStyle ["" "" "" "" "" "solid"] field MFString footerStyle ["" "" "" "" "" "solid"] url "nativescript: libuid=CarbonCopy; scriptid=CopierScript; file-win32-x86=CarbonCopy.dll#version=1,0,0,8" }';
    this.VP_ORDER = 1;
  
  // properties
    this.is_loaded = false;
    this.autorefreshstack = [];
    
    this.tooltipOver3D = (arguments.length > 1 && tooltip!=null)? new TooltipOver3D(tooltip) : new TooltipIn3D();

    this.cortona = cortona;
    this.data = null;
    
    this.control_script = null;
    this.navigation_central = null;
    this.root_switch = null;
    this.revision_switch = null;
    this.axes_switch = null;
    this.callouts_group = null;
    
    this._skipNodes = new Array();
    this._lastOverObject = null;
  
    // current procedures step id
    this.id_procedure = '';
    this.id_step = '';
    this.id_substep = '';
  
    this.state = 0;
    this.procedure_fraction = 0;
    this.zoom_level = 0.5;
    
    this.initialViewName = null;
    
    this.IPCViewList = new IPCViews();
    this.IPCParts = {};
    this.IPCPartsArray = new Array();
    
    this.nodes = {};
    this.allnodes = {};
    
    this.bgnodes = null;
    
    this._transitions = new Array();
    this._view = null;
    
    this.is_nonlinear_mode = false;
    this._all_steps = null;
    this._active_steps = null;
    
    this._default_skin = "{75B359F4-C1D2-4E21-BC36-F699BD1792BA}";
    this._axes_file = "";
    
    this.is_set_center_mode = false;
    
    this._xEventScript = null;
    this._xProcessedParts = [];
  
    this._cortona_handlers = 
    {
      "on_scene_loaded"   : new Array(null, new Function('success', '_api_b078f91531cd496ea19f383bd8fbf6a5._cortona_handlers["on_scene_loaded"][0](success);_api_b078f91531cd496ea19f383bd8fbf6a5.cortona_on_scene_loaded(success);')),
      "on_scene_unloaded" : new Array(null, new Function('_api_b078f91531cd496ea19f383bd8fbf6a5._cortona_handlers["on_scene_unloaded"][0]();_api_b078f91531cd496ea19f383bd8fbf6a5.cortona_on_scene_unloaded();')),
      "on_mouse_move"     : new Array(null, new Function('Button, Shift, X, Y', '_api_b078f91531cd496ea19f383bd8fbf6a5._cortona_handlers["on_mouse_move"][0](Button, Shift, X, Y);_api_b078f91531cd496ea19f383bd8fbf6a5.cortona_mouse_move(Button, Shift, X, Y);')),
      "on_mouse_up"       : new Array(null, new Function('Button, Shift, X, Y', '_api_b078f91531cd496ea19f383bd8fbf6a5._cortona_handlers["on_mouse_up"][0](Button, Shift, X, Y);_api_b078f91531cd496ea19f383bd8fbf6a5.cortona_mouse_up(Button, Shift, X, Y);')),
      "on_mouse_down"     : new Array(null, new Function('Button, Shift, X, Y', '_api_b078f91531cd496ea19f383bd8fbf6a5._cortona_handlers["on_mouse_down"][0](Button, Shift, X, Y);_api_b078f91531cd496ea19f383bd8fbf6a5.cortona_mouse_down(Button, Shift, X, Y);')),
      "on_mouse_out"      : new Array(null, new Function('_api_b078f91531cd496ea19f383bd8fbf6a5._cortona_handlers["on_mouse_out"][0]();_api_b078f91531cd496ea19f383bd8fbf6a5.cortona_mouse_out();'))
    };
    
    for(var key in this._cortona_handlers)
    {
      this._cortona_handlers[key][0] = (key in this.cortona && this.cortona[key].constructor == Function) ? this.cortona[key] : new Function();
      this.cortona[key] = this._cortona_handlers[key][1];
    }
    
    this._control_script_handlers = 
    {
      "on_start_substep"          : new Function('value', 'hint', 'timestamp', '_api_b078f91531cd496ea19f383bd8fbf6a5._fire_event("on_start_substep", value.GetValue(0), value.GetValue(1), value.GetValue(2)); _api_b078f91531cd496ea19f383bd8fbf6a5.id_procedure = value.GetValue(0); _api_b078f91531cd496ea19f383bd8fbf6a5.id_step = value.GetValue(1); _api_b078f91531cd496ea19f383bd8fbf6a5.id_substep = value.GetValue(2);'),
      "on_vcr_state"              : function(value, hint, timestamp)
      { 
        _api_b078f91531cd496ea19f383bd8fbf6a5._fire_event("on_vcr_state", value.Value); 
        if(_api_b078f91531cd496ea19f383bd8fbf6a5.state == _api_b078f91531cd496ea19f383bd8fbf6a5.PLAY && value.Value == _api_b078f91531cd496ea19f383bd8fbf6a5.STOP) 
          _api_b078f91531cd496ea19f383bd8fbf6a5._nextTransition();
        _api_b078f91531cd496ea19f383bd8fbf6a5.state = value.Value;
      },
      "on_proc_fraction_changed"  : new Function('value', 'hint', 'timestamp', '_api_b078f91531cd496ea19f383bd8fbf6a5._fire_event("on_proc_fraction_changed", value.Value); _api_b078f91531cd496ea19f383bd8fbf6a5.procedure_fraction = value.Value;'),
      "on_zoom_changed"           : new Function('value', 'hint', 'timestamp', '_api_b078f91531cd496ea19f383bd8fbf6a5._fire_event("on_zoom_changed", value.Value); _api_b078f91531cd496ea19f383bd8fbf6a5.zoom_level = value.Value;')
    };
				
// --
    this._tooltip_timeout = null
    this._last_x = this._last_y = this._last_button = this._down_x = this._down_y = 0;    
// --
  
    _api_b078f91531cd496ea19f383bd8fbf6a5 = this;
  }
  
  return _api_b078f91531cd496ea19f383bd8fbf6a5;
}


/* 
 * Cortona automation event handlers 
 */

IPCApi.prototype.cortona_on_scene_loaded = 
  function _api_b078f91531cd496ea19f383bd8fbf6a5_0(success) 
  {
    if(this.cortona != null) 
    {
      if(success) 
      {
      	var engine = this.cortona.Engine;
      	engine.AutoRefresh = 1;
      	
      	success = false;
      	
      	if (engine.RootNodes.Count > 0) 
      	{
      	   this.setAutoRefreshOff();
      	  
      		try
      		{
            this.is_loaded = false;
            
            for(var i=1; i<=engine.RootNodes.Count; i++){
              if(engine.RootNodes.Item(i).TypeName == 'AxesPanel') 
              {
              	this.axes_switch = engine.RootNodes.Item(i);              	
                break;    
              }
            }
    
            this.control_script = null;
            
            for(var i=1; i<=engine.RootNodes.Count; i++)
              if(engine.RootNodes.Item(i).TypeName == 'IPCSimulation') 
              {
                this.control_script = engine.RootNodes.Item(i)
                break;    
              }
            
            if(this.control_script == null) 
            {
              this.control_script = engine.CreateProtoFromString(this.ICA_CONTROL_SCRIPT_SYNTAX).CreateInstance();
              engine.RootNodes.Add(this.control_script);
             
              for(var i=1; i<=engine.RootNodes.Count; i++)
                if(engine.RootNodes.Item(i).TypeName == 'Procedure') 
                {
                  this.control_script.Fields.Item('procedure').Value = engine.RootNodes.Item(i);
                  break;    
                }
              var _nodes = engine.CreateVrmlFromString('Group{}');
              this.revision_switch = _nodes.GetValue(0);
  						engine.RootNodes.Add(this.revision_switch);
            }
            if(this.ATP!=0){
            	var tmNodes = engine.CreateVrmlFromString('Script{eventIn MFNode trnsNodes eventIn MFNode dcNodes eventIn MFNode emsNodes eventIn SFString inVal eventOut SFString outVal url "javascript: function inVal(value){outVal=value;}function emsNodes(value){var hlColor=value[0].emissiveColor;for(var i=1; i<value.length; i++){value[i].appearance.material.emissiveColor=hlColor;}}function dcNodes(value){var slColor=value[0].diffuseColor;var nodes=[];for(var i=1; i<value.length; i++){nodes.push(value[i]);}for(var i=0;i<nodes.length;i++){var n=nodes[i];dcNode(n, slColor);if(n.children){var ch = n.children;for(var j=0; j<ch.length; j++){nodes.push(ch[j]);}}}}function dcNode(nd, slColor){if(nd){if(nd.appearance && nd.appearance.material)nd.appearance.material.diffuseColor=slColor;var cr=nd.currentRepresentation;if(nd.representations && nd.representations.length>cr){var geom = nd.representations[cr].geometry;if(geom && geom.color && geom.color.color){var fc=geom.color.color;for(var j=0; j<fc.length; j++){fc[j]=slColor;}}}}}function trnsNodes(value){var t=value[0].transparency;var nodes=[];for(var i=1;i<value.length;i++){nodes.push(value[i]);}for(var i=0;i<nodes.length;i++){var n=nodes[i];if(n){if(n.appearance && n.appearance.material)n.appearance.material.transparency=t;if(n.children){var ch=n.children;for(var j=0;j<ch.length;j++){nodes.push(ch[j]);}}}}}"}');
    			this._xEventScript=tmNodes.GetValue(0);
    			engine.RootNodes.Add(this._xEventScript);
    			this._xEventScript.Fields.Item("outVal").Advise(_api_b078f91531cd496ea19f383bd8fbf6a5._onEventX, 0);
            }
        		var skin_info=null;
        		try 
        		{
        			skin_info=engine.Nodes.Item("_SKIN_INFO");
        		}
        		catch(exception)
        		{
        			var skin_node_syntax='PROTO WorldInfo0 [exposedField MFString info [] exposedField SFString title ""]{Group{}}DEF _SKIN_INFO WorldInfo0{info["fit=false", "setcenter=false", "skipsensors=true", "limits='+this.DEFAULT_MIN_ZOOM+','+this.DEFAULT_MAX_ZOOM+'"]}';
        			var tmNodes = engine.CreateVrmlFromString(skin_node_syntax);
        			skin_info=tmNodes.GetValue(0);
        			engine.RootNodes.Add(skin_info);
        		}
    		
        		this._advise_control_script_events();
            
            this.navigation_central = this.control_script;
            this.root_switch = this.control_script;
        		
        		this.is_loaded = true;
        		        		        		    
      			success = true;
    
            this.initialize_nonlinear_mode();
      		} 
      		catch(exception) 
      		{
      		 engine.RootNodes.Clear();  
      		}       	
      		
      		this.prepareIPCParts(this.data.dplist);
      		this.cortona.Skin = this._default_skin;
      		
      		for(var i=0; i < this.uiActions.length; i++){
      			this.cortona.uiAction(this.uiActions[i]);
      		}
      		      		      		      		      		
      		this.IPCViewList.loadFromData(this.data.views, this.data.dplist);
        }
        this.restoreAutoRefresh();
      }
      this._fire_event('on_simulation_load', success);
    }
  }

IPCApi.prototype.cortona_on_scene_unloaded = 
  function _api_b078f91531cd496ea19f383bd8fbf6a5_1() 
  {
  	this._unadvise_control_script_events();
    try 
    {
    	this.reset();
    }
    catch(exception) {}
    this.is_loaded = false;
  }

IPCApi.prototype.cortona_mouse_down = 
  function _api_b078f91531cd496ea19f383bd8fbf6a5_2(Button, Shift, X, Y) 
  {  	
    if(!this.is_loaded) return;
    clearTimeout(this._tooltip_timeout);
    this.tooltipOver3D.hide();
    this._fire_event('on_mouse_down', Button, Shift, X, Y);
    if((_api_b078f91531cd496ea19f383bd8fbf6a5.cortona.NavigationBar==1)&&(Y>_api_b078f91531cd496ea19f383bd8fbf6a5.cortona.clientHeight-30))return;
    if(_api_b078f91531cd496ea19f383bd8fbf6a5.is_set_center_mode || Shift==5 || Shift==4){
    	_api_b078f91531cd496ea19f383bd8fbf6a5.is_set_center_mode = false;
    	_api_b078f91531cd496ea19f383bd8fbf6a5._onClick(this._skipAndPick(X, Y), 4, 0, X, Y);
    	return;
    }
    this._last_button = Button;
    this._down_x = X;
    this._down_y = Y;
  } 

IPCApi.prototype.cortona_mouse_move = 
  function _api_b078f91531cd496ea19f383bd8fbf6a5_3(Button, Shift, X, Y) 
  {
  	function vec2_len(x, y, x1, y1){return Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));}
    if(!this.is_loaded) return;
    if((_api_b078f91531cd496ea19f383bd8fbf6a5.cortona.NavigationBar==1)&&(Y>_api_b078f91531cd496ea19f383bd8fbf6a5.cortona.clientHeight-30)){
    	this.cortona_mouse_out(); 
    	return;
    }
    this._fire_event('on_mouse_move', Button, Shift, X, Y);
    if((Button == 0) && vec2_len(X, Y, this._last_x, this._last_y) > this.MOUSE_MOVE_SENSITIVITY) 
    {
      this._last_x = X;
      this._last_y = Y;
      this.tooltipOver3D.setXY(X, Y);
      this._onOver(this._skipAndPick(X, Y));
    }
  } 

IPCApi.prototype.cortona_mouse_up = 
  function _api_b078f91531cd496ea19f383bd8fbf6a5_4(Button, Shift, X, Y) 
  {
  	function vec2_len(x, y, x1, y1){return Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));}
    if(!this.is_loaded) return;
    this._fire_event('on_mouse_up', Button, Shift, X, Y);
    if((_api_b078f91531cd496ea19f383bd8fbf6a5.cortona.NavigationBar==1)&&(Y>_api_b078f91531cd496ea19f383bd8fbf6a5.cortona.offsetHeight-30))return;
    if(vec2_len(X, Y, this._down_x, this._down_y) < this.MOUSE_MOVE_SENSITIVITY) 
    {
      this._onClick(this._skipAndPick(X, Y), this._last_button, Shift, X, Y);
    }
  } 
  

IPCApi.prototype.cortona_mouse_out = 
  function _api_b078f91531cd496ea19f383bd8fbf6a5_5() 
  {
    if(!this.is_loaded) return;
    this.reset();
  } 

IPCApi.prototype._fire_event = 
  function _api_b078f91531cd496ea19f383bd8fbf6a5_6()
  {
    if(arguments.length > 0) 
    {
      var method = arguments[0];      
      if(method in this) 
      {
        var args = new Array();
        for(var i=1; i<arguments.length; i++)
          args.push(arguments[i]);
        this[method].apply(this, args);
      }
    }
  }

IPCApi.prototype._advise_control_script_events = 
  function _api_b078f91531cd496ea19f383bd8fbf6a5_7()
  {
    if(this.control_script)
      for(var key in this._control_script_handlers)
        this.control_script.Fields.Item(key).Advise(this._control_script_handlers[key], this);
  }

IPCApi.prototype._unadvise_control_script_events = 
  function _api_b078f91531cd496ea19f383bd8fbf6a5_8()
  {
    if(this.control_script)
      for(var key in this._control_script_handlers)
        this.control_script.Fields.Item(key).Unadvise(this._control_script_handlers[key]);
    if(this._xEventScript){
    	this._xEventScript.Fields.Item("outVal").Unadvise(_api_b078f91531cd496ea19f383bd8fbf6a5._onEventX);
    	this._xEventScript=null;
    }
  }

// methods
IPCApi.prototype.reset = IPCApi_reset;

IPCApi.prototype.load = IPCApi_load;
IPCApi.prototype.loadMetadate = IPCApi_loadMetadate;
IPCApi.prototype.unload = IPCApi_unload;

IPCApi.prototype.setIPCView = IPCApi_setIPCView;
IPCApi.prototype.gotoIPCView = IPCApi_gotoIPCView;
IPCApi.prototype._nextTransition = IPCApi__nextTransition;

IPCApi.prototype.hide_background_geometry = IPCApi_hide_background_geometry;
IPCApi.prototype.show_background_geometry = IPCApi_show_background_geometry;

IPCApi.prototype.set_ui_axis = IPCApi_set_ui_axis;
IPCApi.prototype.set_ui_zoom = IPCApi_set_ui_zoom;
IPCApi.prototype.set_ui_centerpoint = IPCApi_set_ui_centerpoint;
IPCApi.prototype.set_ui_revision = IPCApi_set_ui_revision;

IPCApi.prototype.zoom_reset = IPCApi_zoom_reset;
IPCApi.prototype.zoom_set_delta = IPCApi_zoom_set_delta;
IPCApi.prototype.zoom_set_level = IPCApi_zoom_set_level;

IPCApi.prototype._skipAndPick = IPCApi__skipAndPick;
IPCApi.prototype._onOver = IPCApi__onOver;
IPCApi.prototype._onClick = IPCApi__onClick;

IPCApi.prototype.setViewpoint = IPCApi_setViewpoint;
IPCApi.prototype.checkPosition = IPCApi_checkPosition;
IPCApi.prototype.activatePageViewpoint = IPCApi_activatePageViewpoint;
IPCApi.prototype._fitToObject = IPCApi__fitToObject;
IPCApi.prototype._fitToBoundBox = IPCApi__fitToBoundBox;
IPCApi.prototype._getNodesBoundBox = IPCApi__getNodesBoundBox;
IPCApi.prototype.fitToScene = IPCApi_fitToScene;
IPCApi.prototype.fitToViewParts = IPCApi_fitToViewParts;
IPCApi.prototype.resetCenterpoint = IPCApi_resetCenterpoint;
IPCApi.prototype._calculateMaxZoom = IPCApi__calculateMaxZoom;
IPCApi.prototype._getSceneBBox = IPCApi__getSceneBBox;
IPCApi.prototype.setCenterpointToPart = IPCApi_setCenterpointToPart;
IPCApi.prototype._setSceneCenterpoint = IPCApi__setSceneCenterpoint;
IPCApi.prototype.fitToParts = IPCApi_fitToParts;
IPCApi.prototype.setCenterpointToParts = IPCApi_setCenterpointToParts;
IPCApi.prototype.setCenterpointToViewParts = IPCApi_setCenterpointToViewParts;

IPCApi.prototype.prepareIPCParts = IPCApi_prepareIPCParts;
IPCApi.prototype.getIPCPart = IPCApi_getIPCPart;
IPCApi.prototype.getIPCPartByIndex = IPCApi_getIPCPartByIndex;
IPCApi.prototype.getVrmlNode = IPCApi_getVrmlNode;
IPCApi.prototype._createVrmlNode = IPCApi__createVrmlNode;

IPCApi.prototype.clearAllCallouts = IPCApi_clearAllCallouts;


// New API methods for nonlinear_mode
IPCApi.prototype.initialize_nonlinear_mode = SimulationAPI_nonlinear_mode;
IPCApi.prototype.set_procedure = SimulationAPI_set_procedure;
IPCApi.prototype.reset_procedure = SimulationAPI_reset_procedure;

IPCApi.prototype.jump_to_start = SimulationAPI_jump_to_start;
IPCApi.prototype.jump_to_end = SimulationAPI_jump_to_end;

// service methods
IPCApi.prototype._preset_to = SimulationAPI_preset_to;
IPCApi.prototype._preset_to_start = SimulationAPI_preset_to_start;
IPCApi.prototype._preset_to_end = SimulationAPI_preset_to_end;
IPCApi.prototype._add_animation_step = SimulationAPI_add_animation_step;

// Nonrealized methods
IPCApi.prototype.set_reverse = SimulationAPI_set_reverse;

// New API method 
IPCApi.prototype.set_axes_file = SimulationAPI_set_axes_file;

// New service method
IPCApi.prototype._set_zoom_limits = SimulationAPI_set_zoom_limits;
IPCApi.prototype._createFieldFromArray = IPCApi__createFieldFromArray;
IPCApi.prototype._createArrayFromField = IPCApi__createArrayFromField;
IPCApi.prototype._assignValueFromArray = IPCApi__assignValueFromArray;
IPCApi.prototype._getClickedIPCVrmlNode = IPCApi__getClickedIPCVrmlNode;
IPCApi.prototype._getIPCVrmlNodeArray = IPCApi__getIPCVrmlNodeArray;

IPCApi.prototype.setNavigationStyle = IPCApi_setNavigationStyle;
IPCApi.prototype.getNavigationStyle = IPCApi_getNavigationStyle;

IPCApi.prototype.setCortonaSkin = IPCApi_setCortonaSkin;

IPCApi.prototype.enableNavigation = IPCApi_enableNavigation;
IPCApi.prototype.showCortonaProperties = IPCApi_showCortonaProperties;
IPCApi.prototype.setAutoRefreshOff = IPCApi_setAutoRefreshOff;
IPCApi.prototype.restoreAutoRefresh = IPCApi_restoreAutoRefresh;
IPCApi.prototype.doRefresh = IPCApi_doRefresh;
IPCApi.prototype.setAutoRefreshOn = IPCApi_setAutoRefreshOn;

IPCApi.prototype.evalOnEventX = IPCApi_evalOnEventX;
IPCApi.prototype._onEventX = IPCApi__onEventX;

IPCApi.prototype.checkCortonaComponent = IPCApi_checkCortonaComponent;

IPCApi.prototype.print3D = IPCApi_print3D;
IPCApi.prototype.openPrintPageSetup = IPCApi_openPrintPageSetup;
IPCApi.prototype.setPrintHeaderStyle = ipcApi_setPrintHeaderStyle;
IPCApi.prototype.setPrintFooterStyle = ipcApi_setPrintFooterStyle;
IPCApi.prototype.setPrintHeader = ipcApi_setPrintHeader;
IPCApi.prototype.setPrintFooter = ipcApi_setPrintFooter;
IPCApi.prototype._copier_field_set_string = IPCApi__copier_field_set_string;
IPCApi.prototype._copier_field_set_string_array = IPCApi__copier_field_set_string_array;
IPCApi.prototype.checkPrintComponent = IPCApi_checkPrintComponent;

IPCApi.prototype._GetVRMLBBox_Array = IPCApi__GetVRMLBBox_Array;

function SimulationAPI_nonlinear_mode() {
  if(this.is_loaded && (!this.is_nonlinear_mode)){
  	this.is_nonlinear_mode=true;
  	var e = this.cortona.Engine;
  	var OP = this.control_script.Fields.Item('procedure').Value;
  	this._all_steps = OP.Fields.Item('steps');
  	var newproc = e.CreateProtoFromString('PROTO _AC9F503D-A7CE-470b-A636-264433E4A204 [field SFString title "" field SFString comment "" exposedField SFString id "" exposedField MFNode steps []]{Group{children IS steps}}').CreateInstance();
  	this._active_steps = newproc.Fields.Item('steps');
  	newproc.Fields.Item('id').Assign(OP.Fields.Item('id'));
  	newproc.Fields.Item('title').Assign(OP.Fields.Item('title'));
  	try{newproc.Fields.Item('comment').Assign(OP.Fields.Item('comment'));}catch(exception){}
  	newproc.Fields.Item('steps').Assign(OP.Fields.Item('steps'));
  	this.control_script.Fields.Item('procedure').Value = newproc;
  }
}

function SimulationAPI_reset_procedure() {
  if(this.is_loaded && this.is_nonlinear_mode){
  	this._active_steps.Assign(this._all_steps);
  }
}

function SimulationAPI_set_procedure(subtasks, position) { 
  if(this.is_loaded && this.is_nonlinear_mode){
    this.control_script.Fields.Item('vcr_pause').Value = 0;
   	this._active_steps.Clear();
  	if(typeof(subtasks)=="string") 
  	  this._add_animation_step(subtasks);
  	else 
    	for(var i=0; i<subtasks.length; i++)this._add_animation_step(subtasks[i]);
  	
  	if(this._active_steps.Count>0){
  		var pos=0;
  		if(typeof(position)!="undefined")
  			try {if(position==1)pos=1;} catch(exception){pos=0;}
  		if(pos==0)
  		 this._preset_to_start();
  	  else
  	   this._preset_to_end();
  		return 1;
  	}
  
  }
  return 0;
}

function SimulationAPI_add_animation_step(subtask) {
  if(this.is_nonlinear_mode){
  	for(var z=0; z<this._all_steps.Count; z++)
  	  if(this._all_steps.GetValue(z).Fields.Item("id").Value == subtask) {
  		  this._active_steps.Add(this._all_steps.GetValue(z));
  		  return;
  	  }
  	alert('WARNING:\r\n\r\nAnimation with ID - '+subtask+' - not found.');
  }
}


function SimulationAPI_preset_to(step, substep, fraction) {
	var a = this.cortona.Engine.CreateField('MFFloat');
	a.Add(step); 
	a.Add(substep); 
	a.Add(fraction); 
	var fcategory = -1;
	try {fcategory=this.control_script.Fields.Item('now_step_substep_fraction').Category;} 
	 catch(exception){}
	if(fcategory > 0)this.control_script.Fields.Item('now_step_substep_fraction').Assign(a);
		else{
			this.control_script.Fields.Item('ControlScript').Value.Fields.Item('reinitialize_substep').Value = 0;
			this.control_script.Fields.Item('ControlScript').Value.Fields.Item('oldstep').Value = step;
			this.control_script.Fields.Item('ControlScript').Value.Fields.Item('oldsubstep').Value = substep;
			this.control_script.Fields.Item('ControlScript').Value.Fields.Item('set_step_substep_fraction').Assign(a);		
		}
}

function SimulationAPI_preset_to_start() {
  if((this.is_nonlinear_mode)&&(this._active_steps.Count > 0))this._preset_to(0, 0, 0);
}

function SimulationAPI_preset_to_end() {
  if((this.is_nonlinear_mode)&&(this._active_steps.Count > 0)){
  	var a = this.cortona.Engine.CreateField('MFFloat');
  	var laststep=this._active_steps.Count-1;
  	var lastsubstep=this._active_steps.GetValue(laststep).Fields.Item('substeps').Count-1;
  	this._preset_to(laststep, lastsubstep, 1);
  }
}

function SimulationAPI_jump_to_start() {
  this.control_script.Fields.Item('vcr_set_proc_fraction').Value = 0;
}

function SimulationAPI_jump_to_end() {
  this.control_script.Fields.Item('vcr_set_proc_fraction').Value = 1;
}

function SimulationAPI_set_reverse(flag) { 
  if(this.is_loaded) this.control_script.Fields.Item('sim_reverse').Value = flag;
}

function SimulationAPI_set_axes_file(file){
	this._axes_file=file;
	if(this.is_loaded){
  	if(this._axes_file == ""){
  		this.control_script.Fields.Item("externalAxes").Clear();
  	}
  	else{
    	this.control_script.Fields.Item("externalAxes").Add(cortona.Engine.CreateVrmlFromString('Inline{url "'+file+'"}'));
    }
	}
}

function SimulationAPI_set_zoom_limits(minLimit, maxLimit){
	if(this.is_loaded){
		try{
  		this.control_script.Fields.Item("setMinZoom").Value=minLimit;
  		this.control_script.Fields.Item("setMaxZoom").Value=maxLimit;
  		var e = this.cortona.Engine;
		e.Nodes.Item("_SKIN_INFO").Fields.Item("info").SetValue(3,"limits="+minLimit+","+maxLimit);
  	}catch(e){}
  }
}

function IPCApi__GetVRMLBBox_Array(oNode){
	var bc = oNode.BBoxCenter;
	var bs = oNode.BBoxSize;
	return [bc.X, bc.Y, bc.Z, bs.X, bs.Y, bs.Z];
}


// ====================================
function IPCApi_checkCortonaComponent(){
	try{
		this.cortona.uiAction("revokePropPage:{E5711FD5-464F-11D3-9D7D-00A0247A5F3F}");
		return true;
	}catch(e){
		return false;
	}
}

function IPCApi_enableNavigation(bFlag){
	this.cortona.InputDevices = (bFlag)? 255: 0;
}

function IPCApi_showCortonaProperties(){
	this.cortona.uiAction("preferences");
}

function IPCApi_setCortonaSkin(sSkin){
	this._default_skin = sSkin;
	if(this.is_loaded)
		this.cortona.Skin = this._default_skin;
}

function IPCApi_setNavigationStyle(sStyle){
	if(sStyle == "goto"){
		this.is_set_center_mode = true;
	}else{
		this.cortona.NavigationStyle = sStyle;
	}
}

function IPCApi_getNavigationStyle(){
	if(this.is_set_center_mode){
		return "goto";
	}else{		
		return this.cortona.NavigationStyle;
	}
}

function IPCApi_setAutoRefreshOff()
{
  this.autorefreshstack.push(this.cortona.Engine.AutoRefresh);
  if(this.cortona.Engine.AutoRefresh!=0)this.cortona.Engine.AutoRefresh = 0;
}
function IPCApi_restoreAutoRefresh() 
{
	var _newVal = (this.autorefreshstack.length>0)?this.autorefreshstack.pop():1;
	if(this.cortona.Engine.AutoRefresh != _newVal)this.cortona.Engine.AutoRefresh = _newVal;
	if(this.ATP!=0 && _newVal!=0){
    	_api_b078f91531cd496ea19f383bd8fbf6a5.evalOnEventX("1");
    }
}
function IPCApi_setAutoRefreshOn()
{
  this.autorefreshstack=[];
  this.cortona.Engine.AutoRefresh = 1;
  _api_b078f91531cd496ea19f383bd8fbf6a5.evalOnEventX("1");
}
function IPCApi_doRefresh()
{
	if(this.cortona.Engine.AutoRefresh==0){
		this.cortona.Refresh();
		if(this.ATP!=0){
			_api_b078f91531cd496ea19f383bd8fbf6a5.evalOnEventX("1");
		}
	}
}

function IPCApi_evalOnEventX(value)
{
  if(this._xEventScript)this._xEventScript.Fields.Item("inVal").Value=value;
}

function IPCApi__onEventX(value, hint, timeStamp)
{
	if(value.Value=="1"){
		var xDCP = _api_b078f91531cd496ea19f383bd8fbf6a5._xProcessedParts;
		var engine = _api_b078f91531cd496ea19f383bd8fbf6a5.cortona.Engine;
		var emsNodes = null;
		var dcNodes = null;
		var trnsNodes = null;
		for(var i=0; i<xDCP.length; i++){
			var nds = xDCP[i][1].vrmlNodes;
			if(xDCP[i][0]==0){
		  		nds.mapv(new Function('n', 'n.restoreMaterial(true);'));
		  	}else if(xDCP[i][0]==1){
		  		nds.mapv(new Function('n', 'n.resetMaterial(true);'));
		  	}else if(xDCP[i][0]==2){
		  		if(!emsNodes){
		  			emsNodes = engine.CreateField('MFNode');
		  			emsNodes.Add(engine.CreateNodeFromString("Material{emissiveColor "+xDCP[i][2].join(' ')+"}"));
		  		}
		  		for(var j=0; j<nds.length; j++){
		  			emsNodes.Add(nds[j].node);
		  		}
		  	}else if(xDCP[i][0]==3){
		  		var f = new Function('n', 'n.saveMaterial(true);');
		  		nds.mapv(f);
		  		if(!dcNodes){
		  			dcNodes = engine.CreateField('MFNode');
		  			dcNodes.Add(engine.CreateNodeFromString("Material{diffuseColor "+xDCP[i][2].join(' ')+"}"));
		  		}
		  		for(var j=0; j<nds.length; j++){
		  			dcNodes.Add(nds[j].node);
		  		}
		  	}else if(xDCP[i][0]==4){
		  		var f = new Function('n', 'n.saveMaterial(true);');
		  		nds.mapv(f);
		  		if(!trnsNodes){
		  			trnsNodes = engine.CreateField('MFNode');
		  			trnsNodes.Add(engine.CreateNodeFromString("Material{transparency "+xDCP[i][2]+"}"));
		  		}
		  		for(var j=0; j<nds.length; j++){
		  			trnsNodes.Add(nds[j].node);
		  		}
		  	}else if(xDCP[i][0]==5){
		  		var f = new Function('n', 'n.show('+xDCP[i][2]+');');
		  		nds.mapv(f);
		  	}else if(xDCP[i][0]==6){
		  		var f = new Function('n', 'n.filter('+xDCP[i][2]+');');
		  		nds.mapv(f);
		  	}
		}
		_api_b078f91531cd496ea19f383bd8fbf6a5._xProcessedParts=[];
		if(emsNodes){
			_api_b078f91531cd496ea19f383bd8fbf6a5._xEventScript.Fields.Item("emsNodes").Assign(emsNodes);
		}

		if(dcNodes){
			_api_b078f91531cd496ea19f383bd8fbf6a5._xEventScript.Fields.Item("dcNodes").Assign(dcNodes);
		}
		if(trnsNodes){
			_api_b078f91531cd496ea19f383bd8fbf6a5._xEventScript.Fields.Item("trnsNodes").Assign(trnsNodes);
		}
	}else{
		eval(""+value.Value);
	}
}

function IPCApi__nextTransition() {
  if(this.is_loaded) {
    if(this._transitions.length > 0) {
      var transition = this._transitions.shift();
      var last_view = this._view;
      this._view = transition.name;
      this.control_script.Fields.Item('set_speed_ratio').Value = 5;
      this.set_procedure(transition.id, transition.reverse ? 1 : 0);
      this.set_reverse(transition.reverse);
      var view_nm = this._view;
      if(last_view && ((this.VP_ORDER==1 && transition.reverse) || (this.VP_ORDER==2 && !transition.reverse))){
	  	view_nm = last_view;
      }
      var _vp_list = this.IPCViewList.get(view_nm).viewpointsList;
      var isCP = false;
      if(_vp_list.length > 0){
        isCP=this.checkPosition(_vp_list[0]);
        this.setViewpoint(_vp_list[0]);
      }
      else
        this.fitToViewParts(3);
      
      setTimeout("_api_b078f91531cd496ea19f383bd8fbf6a5.control_script.Fields.Item('vcr_play').Value = 0;", (isCP)? 0: 1700);
      return true;
    }
    setTimeout("_api_b078f91531cd496ea19f383bd8fbf6a5._fire_event('on_view_changed', '"+this._view+"');", 200);
  }
  return false;
}

function IPCApi_setIPCView(sIPCViewName) {
  if(this.is_loaded) {
  	this.show_background_geometry();
  	this.bgnodes = null;
    this.setAutoRefreshOff();
    if(this.IPCViewList.exists(sIPCViewName)) {
      var view = this.IPCViewList.get(sIPCViewName);      
      if(view.id != '' && view.id != null) {
        this.control_script.Fields.Item('set_speed_ratio').Value = 1000;
        this.set_procedure(view.id, 0);
        this.set_reverse(false);
        this.control_script.Fields.Item('vcr_play').Value = 0;
        this._view = sIPCViewName;
      }else{
	      this._view = sIPCViewName;
	      setTimeout("_api_b078f91531cd496ea19f383bd8fbf6a5._fire_event('on_view_changed', '"+this._view+"');", 200);
    	}
    }    
    this.restoreAutoRefresh();
  }
}

function IPCApi_gotoIPCView(sIPCViewName) {
  if(this.is_loaded) {
  	this.show_background_geometry();
  	this.bgnodes = null;
  	this._transitions = this.IPCViewList.findPath(this._view, sIPCViewName);
  	if(this._view == null || this._view == sIPCViewName || this._transitions.length == 0){ 
  		this.setIPCView(sIPCViewName);
  		return;
  	}  	
    if(_api_b078f91531cd496ea19f383bd8fbf6a5.state != _api_b078f91531cd496ea19f383bd8fbf6a5.PLAY) {
      if(!this._nextTransition()){
        this.setIPCView(sIPCViewName);
      }
    }  	 
  }
}

function IPCApi_prepareIPCParts(items){
	for(var i=0; i<items.length; i++){
		var part = new IPCPart(items[i].vrmlnodes, i);
		this.IPCPartsArray.push(part);
		this.IPCParts[items[i].id]=part;
	}	
}     		

function IPCApi_getIPCPart(sID){	
	return (sID in this.IPCParts) ? this.IPCParts[sID] : null;
}
function IPCApi_getIPCPartByIndex(index){
	return this.IPCPartsArray[index];
}
function IPCApi_getVrmlNode(sNodeName){
	if(!(sNodeName in this.nodes)){
		var node = this.cortona.Engine.Nodes.Item(sNodeName);
		if(node.TypeName=="ObjectVM"){
			this.nodes[sNodeName] = this._createVrmlNode(node, sNodeName);
		}else{
			return null;
		}
		
	}
	return this.nodes[sNodeName];
}

function IPCApi__createVrmlNode(node, sNodeName){
	if(sNodeName==""){
		return new IPCVrmlNode(node);
	}
	if(!(sNodeName in this.allnodes)){
		try{
			this.allnodes[sNodeName] = new IPCVrmlNode(node, sNodeName);
		}catch(e){
			this.allnodes[sNodeName] = null;
		}
	}	
	return this.allnodes[sNodeName];	
}

function IPCApi_fitToViewParts(/*[sViewname], [fZoomK]*/) {
  if(this._view != null) {
    var a = new Array();
    var view = this.IPCViewList.get(this._view);
    for(var key in view.nodesList)
      a.push(view.nodesList[key]);
    
    var sViewname = "";
    var fZoomK = 1;
    if(arguments.length > 0)sViewname = arguments[0];
		if(arguments.length > 1)fZoomK = arguments[1];
		var bb = this._getNodesBoundBox(a);
		this._fitToBoundBox(bb, sViewname, fZoomK);
  }
}
function IPCApi_fitToParts(aParts/*, [sViewname], [fZoomK]*/) {
	var rawnodes = new Array();
	for(var i=0; i<aParts.length; i++){
		rawnodes = rawnodes.concat(aParts[i].vrmlNodes);
	}
	var nodes = new Array();
	var nnms = {};
	for(var i=0; i<rawnodes.length; i++){
		if(rawnodes[i].name.length==0 || !(rawnodes[i].name in nnms)){
			nnms[rawnodes[i].name]=true;
			nodes.push(rawnodes[i]);
		}
	}	
	var fZoomK = 1;
	var sViewname = "";
	if(arguments.length > 1)sViewname = arguments[1];
	if(arguments.length > 2)fZoomK = arguments[2];
	var bb = this._getNodesBoundBox(nodes);
	this._fitToBoundBox(bb, sViewname, fZoomK);
}

function IPCApi_setCenterpointToViewParts() {
  if(this._view != null) {
    var a = new Array();
    var view = this.IPCViewList.get(this._view);
    for(var key in view.nodesList)
      a.push(view.nodesList[key]);
  
	  var bb = this._getNodesBoundBox(a);
	  if(bb == null || bb.length<6 || ((bb[3]==0)&&(bb[4]==0)&&(bb[5]==0)))return;	
	  var f = this.cortona.Engine.CreateField("MFFloat");
	  for(var i=0; i<3; i++)
	    f.Add(this.navigation_central.Fields.Item("avatarSize").GetValue(i));
	  for(var i=0; i<3; i++)
	    f.Add(bb[i]);
	  this.navigation_central.Fields.Item("avatarSize").Assign(f);	
  }
}

function IPCApi_setCenterpointToParts(aParts) {
	var rawnodes = new Array();
	for(var i=0; i<aParts.length; i++){
		rawnodes = rawnodes.concat(aParts[i].vrmlNodes);
	}
	var nodes = new Array();
	var nnms = {};
	for(var i=0; i<rawnodes.length; i++){
		if(rawnodes[i].name.length==0 || !(rawnodes[i].name in nnms)){
			nnms[rawnodes[i].name]=true;
			nodes.push(rawnodes[i]);
		}
	}	
	var bb = this._getNodesBoundBox(nodes);
	this._setSceneCenterpoint(bb);
}

function IPCApi_setCenterpointToPart(oIPCVrmlNode) {
  try {
    this._assignValueFromArray(this.navigation_central.Fields.Item("set_centerpoint"), oIPCVrmlNode.getBBox());
  }
  catch(exception) {}
}

function IPCApi__createArrayFromField(f) {
	var arr = [];
    switch(f.Type) {
      case 211: // SFString
      case 209: // SFNode
      case 215: // SFTime
      case 207: // SFInt32
      case 205: // SFFloat
      case 202: // SFBool
        arr=[f.Value];
        break;
      case 203: // SFColor
      	arr=[f.Red, f.Green, f.Blue];
        break;
      case 206: // SFImage
        break;
      case 210: // SFRotation
      	arr=[f.X, f.Y, f.Z, f.Angle];
      	break;
      case 213: // SFVec3f
      	arr=[f.X, f.Y, f.Z];
      	break;
      case 212: // SFVec2f
        arr=[f.X, f.Y];
        break;
    }
  return arr;
}

function IPCApi__createFieldFromArray(fieldName, a) {
  var f = null;
  try {
    f = this.cortona.Engine.CreateField(fieldName);
    switch(f.Type) {
      case 211: // SFString
      case 209: // SFNode
        f.Value = a[0];
        break;
      case 215: // SFTime
      case 207: // SFInt32
      case 205: // SFFloat
        f.Value = new Number(a[0]);
        break;
      case 202: // SFBool
        f.Value = new Boolean(a[0]);
        break;
      case 203: // SFColor
        f.Red = new Number(a[0]);
        f.Green = new Number(a[1]);
        f.Blue = new Number(a[2]);
        break;
      case 206: // SFImage
        break;
      case 210: // SFRotation
        f.Angle = new Number(a[3]);
      case 213: // SFVec3f
        f.Z = new Number(a[2]);
      case 212: // SFVec2f
        f.Y = new Number(a[1]);
        f.X = new Number(a[0]);
        break;
    }
  }
  catch(exception) {}
  return f;
}

function IPCApi__assignValueFromArray(field, a) {
  field.Assign(this._createFieldFromArray(field.TypeName, a));
}

function IPCApi__getClickedIPCVrmlNode(a) {
  for(var i=a.length-1; i>=0; i--) {
  	var nm = a[i].node.Name;
  	if((nm != "") && (nm in	this.nodes)){
  		return this.nodes[nm];
  	}
  }
  return null;
}

function IPCApi__getIPCVrmlNodeArray(chain) {
  var n = new Array();
  for(var i=0; i<chain.Count; i++)
    if(chain.GetValue(i).TypeName == "ObjectVM") {
      var part = this._createVrmlNode(chain.GetValue(i), chain.GetValue(i).Name);
      n.push(part);      
    }
  return n;
}

function IPCApi__calculateMaxZoom(kmax) {
  var max_zoom = 0;
  if(this.is_loaded) {
  	var bb = this._getSceneBBox();
  	var k = 0.75; // 2*Math.tan(0.785398/2)
  	max_zoom = Math.sqrt(bb[3]*bb[3]+bb[4]*bb[4]+bb[5]*bb[5])*kmax/k;
  	if(max_zoom == 0) max_zoom = 	this.DEFAULT_MAX_ZOOM;
  }
	return max_zoom;
}

function IPCApi__getSceneBBox() {
  if(this.is_loaded) {
  	this.root_switch.Fields.Item('whichChoice').Value = -1;
  	var is_hide_axes = false;
  	if(this.axes_switch!=null && this.axes_switch.Fields.Item('whichChoice').Value>=0){
  		is_hide_axes = true;
  		this.axes_switch.Fields.Item('whichChoice').Value = -1;
  	}
  	var bb = this._GetVRMLBBox_Array(this.cortona.Engine);
  	
  	this.root_switch.Fields.Item('whichChoice').Value = 0;
  	
  	if(is_hide_axes)this.axes_switch.Fields.Item('whichChoice').Value = 0;
  	return bb;
  }
  return null;
}

function IPCApi_resetCenterpoint() {
	return;
  if(this.is_loaded) {
    var bb = this._getSceneBBox();
    this._assignValueFromArray(this.navigation_central.Fields.Item("set_centerpoint"), bb)
  }
}

function IPCApi__onOver(chain) {
  if(this.state == this.STOP) {
    var partNode = this._getClickedIPCVrmlNode(this._getIPCVrmlNodeArray(chain));
    if(partNode != this._lastOverObject) {
      this._fire_event("on_part_over", partNode);
      this._lastOverObject = partNode;
  
      clearTimeout(this._tooltip_timeout);
      this.tooltipOver3D.hide();
  
        if(this.ENABLE_TOOLTIPS)
          this._tooltip_timeout = setTimeout('_api_b078f91531cd496ea19f383bd8fbf6a5.tooltipOver3D.show()', this.TOOLTIP_DELAY);
    }
  }
}

function IPCApi__onClick(chain, button, shift, X, Y) {
  if(this.state == this.STOP) {
    var n = this._getIPCVrmlNodeArray(chain);
    if(button == 1 || button == 2) {
      var partNode = this._getClickedIPCVrmlNode(this._getIPCVrmlNodeArray(chain));
      this._fire_event("on_part_click", partNode, button, shift, X, Y);     
    }
  
    if(button & 4 || ((button & 1) && (shift & 4))) {
      if(n.length > 0) {
        if(shift & 1)
          this.setCenterpointToPart(n.pop());
        else{
          var pp = this.cortona.Engine.PickedPoint;
          var fc = this._createFieldFromArray("SFVec3f", [pp.X, pp.Y, pp.Z]);
          this.navigation_central.Fields.Item("set_centerpoint").Assign(fc);
        }
      }
    }
  }
}

function IPCApi__skipAndPick(X, Y) {
  var e = _api_b078f91531cd496ea19f383bd8fbf6a5.cortona.Engine;
  _api_b078f91531cd496ea19f383bd8fbf6a5._skipNodes.mapv(new Function('n', '_api_b078f91531cd496ea19f383bd8fbf6a5.cortona.Engine.AddSkipNode(n);'));
  e.AddSkipNode(_api_b078f91531cd496ea19f383bd8fbf6a5.root_switch);
  if(_api_b078f91531cd496ea19f383bd8fbf6a5.axes_switch!=null)e.AddSkipNode(_api_b078f91531cd496ea19f383bd8fbf6a5.axes_switch);
  
  var chain = e.Pick(X, Y);
   function _findShape(chain)
  {
    var shape = null;
    if(chain.Count > 0)
    {
      for(var i = chain.Count-1; chain.GetValue(i).TypeName == 'Shape' && i >= 0; i--){ 
        shape = chain.GetValue(i);
        break;
      }
    }
    return shape;
  }
  
  try{
	  var shape = _findShape(chain);
	  var limit = 1000;
	  while(limit>0 && _api_b078f91531cd496ea19f383bd8fbf6a5.SKIP_TRANSPARENT_SHAPES && shape && shape.Fields.Item("appearance").Value.Fields.Item("material").Value.Fields.Item("transparency").Value > this.SKIP_TRANSPARENCY_THRESHOLD_LEVEL)
	  {
	  	limit--;
	    e.AddSkipNode(shape);
	    chain = e.Pick(X, Y);
	    shape = _findShape(chain);
	  }
	  e.ClearSkipNodes();
	  return chain;
  }catch(err){
  	  e.ClearSkipNodes();
  	  return e.CreateField('MFNode');
  }
}

function IPCApi_reset() {
  try {
    clearTimeout(this._tooltip_timeout);
    this.tooltipOver3D.hide();
    this.tooltipOver3D.setXY(0, 0);
  } 
  catch(exception) {}
  try {
    this.cortona.Engine.ClearSkipNodes();
  } 
  catch(exception) {}
  
  this._last_x = 0;
  this._last_y = 0;
  this._last_button = -1;

  this._tooltip_timeout = null;  
 
  this._fire_event('on_reset', 0);
}  

/* Cortona automation event handlers */

function IPCApi_load(sUrl, ipcdata) {
  _api_b078f91531cd496ea19f383bd8fbf6a5 = this;
  this.data = ipcdata;
  this.cortona.Scene = sUrl;  
}

function IPCApi_loadMetadate(ipcdata) {
  _api_b078f91531cd496ea19f383bd8fbf6a5 = this;
  this.data = ipcdata;
}

function IPCApi_unload() {
  this.is_loaded = false;
  this.cortona.Engine.RootNodes.Clear();

  this.control_script = null;
  this.navigation_central = null;
  this.root_switch = null;
  this.axes_switch = null;
 
  this._skipNodes.length = 0;
  this._lastOverObject = null;

  this.id_procedure = '';
  this.id_step = '';
  this.id_substep = '';

  this.state = 0;
  this.procedure_fraction = 0;
  this.zoom_level = 0.5;
  
  this._transitions = new Array();
  this.IPCViewList.clear();
  
  this.is_nonlinear_mode = false;
  this._all_steps = null;
  this._active_steps = null;

  this._fire_event('on_simulation_unload');
}
function IPCApi_setViewpoint(oViewpoint) {
  this.navigation_central.Fields.Item("set_viewpoint").Value = oViewpoint.node;
  var minVPZoom = this.DEFAULT_MIN_ZOOM;
  var maxVPZoom = this._calculateMaxZoom(2.1);
  if(oViewpoint.node.TypeName=="Viewpoint2"){
  	try{
	  	var center = oViewpoint.node.Fields.Item("center");
		  var f = this.cortona.Engine.CreateField("MFFloat");
		  for(var i=0; i<3; i++)
		    f.Add(this.navigation_central.Fields.Item("avatarSize").GetValue(i));
	    f.Add(center.X);
	    f.Add(center.Y);
	    f.Add(center.Z);
		  this.navigation_central.Fields.Item("avatarSize").Assign(f);	  	
		var position = oViewpoint.node.Fields.Item("position");
		var distance = Math.sqrt((center.X-position.X)*(center.X-position.X)+(center.Y-position.Y)*(center.Y-position.Y)+(center.Z-position.Z)*(center.Z-position.Z));
		if(distance>0 && distance/2<this.DEFAULT_MIN_ZOOM)minVPZoom=distance/2;
		if(distance*2>maxVPZoom)maxVPZoom=distance*2;
		}catch(e){
			this.setCenterpointToViewParts();  
		}
  }else{
  	this.setCenterpointToViewParts();  
  }
  this._set_zoom_limits(minVPZoom, maxVPZoom);
}
function IPCApi_checkPosition(oViewpoint) {
  try{
	  var e = this.cortona.Engine;
	  var cmrPos = e.CameraPosition.Translation;
	  var pos = oViewpoint.node.Fields.Item("position");
	  var distance = Math.sqrt((cmrPos.X-pos.X)*(cmrPos.X-pos.X)+(cmrPos.Y-pos.Y)*(cmrPos.Y-pos.Y)+(cmrPos.Z-pos.Z)*(cmrPos.Z-pos.Z));
	  var lim = Math.sqrt(cmrPos.X*cmrPos.X+cmrPos.Y*cmrPos.Y+cmrPos.Z*cmrPos.Z)/10000;
	  if(distance<=lim){
	  	  var ornt = oViewpoint.node.Fields.Item("orientation");
	  	  var mr = e.CreatePosition(e.CreateNodeFromString("Transform{rotation "+ornt.X+" "+ornt.Y+" "+ornt.Z+" "+ornt.Angle+"}"));
		  var r = mr.Inverse().MultRight(e.CameraPosition).Rotation;
	  	  if(r.Angle<0.01){
	  	  	return true;
	  	  }
	  }
  }catch(err){}
  return false
}

function IPCApi_activatePageViewpoint() {
	if(this._view!=null){
		this.setViewpoint(this.IPCViewList.get(this._view).viewpointsList[0]);
	}	
}

function IPCApi__fitToObject(oPart/*[, fZoomK, sViewname]*/) {
  if(!this.is_loaded) return;
  if(oPart == null) return;
  
  var fZoomK = 1;
  var sViewname = "";
  
  if(arguments.length > 1)
    fZoomK = arguments[1];
  if(arguments.length > 2)
    sViewname = arguments[2];
    
  var bb = null;
  var n = oPart;
  var isBBoxEmpty = new Function('bb', 'return bb.slice(3).map(function _(n) {return n == 0;}).and();')
  
  try {  
    switch(oPart.constructor) {
       
      case Array: // array of IPCVrmlNode
      
      	bb=this._getNodesBoundBox(n);
        break;
        
      case IPCVrmlNode:
        bb = oPart.getBBox();
        break;
        
      default:
        bb = this._getSceneBBox();
    }
  }
  catch(exception) {}
  
  if(bb != null && !isBBoxEmpty(bb)) {
  	this._fitToBoundBox(bb, sViewname, fZoomK);
  }
  
}

function IPCApi__getNodesBoundBox(aNodes) {
	var bb = null;
	var isBBoxEmpty = new Function('bb', 'return bb.slice(3).map(function _(n) {return n == 0;}).and();')
	for(var j=0; j<aNodes.length; j++) {
    bb = aNodes[j].getBBox();
    if(!isBBoxEmpty(bb))
      break;
    else
      bb = null;
  }

  for(var i=j+1; i<aNodes.length; i++) {
    var bbox = aNodes[i].getBBox();
    
    if(!isBBoxEmpty(bbox)) { // isBboxNotEmpty
      var xmin = Math.min(bb[0] - bb[3]/2, bbox[0] - bbox[3]/2);
      var ymin = Math.min(bb[1] - bb[4]/2, bbox[1] - bbox[4]/2);
      var zmin = Math.min(bb[2] - bb[5]/2, bbox[2] - bbox[5]/2);
      var xmax = Math.max(bb[0] + bb[3]/2, bbox[0] + bbox[3]/2);
      var ymax = Math.max(bb[1] + bb[4]/2, bbox[1] + bbox[4]/2);
      var zmax = Math.max(bb[2] + bb[5]/2, bbox[2] + bbox[5]/2);

      bb[3] = (xmax - xmin);
      bb[4] = (ymax - ymin);
      bb[5] = (zmax - zmin);

      bb[0] = (xmax + xmin)/2;
      bb[1] = (ymax + ymin)/2;
      bb[2] = (zmax + zmin)/2;
    }
  }
  return bb;
}

function IPCApi__fitToBoundBox(bb, sViewname, fZoomK) {
	if(!this.is_loaded || bb == null || bb.length<6 || ((bb[3]==0)&&(bb[4]==0)&&(bb[5]==0)))return;	
  var e = this.cortona.Engine;
	var k = 0.75; // 2*Math.tan(0.785398/2)
  var zoom = Math.sqrt(bb[3]*bb[3]+bb[4]*bb[4]+bb[5]*bb[5])*fZoomK/k;	
	if(zoom < this.MIN_ZOOM_MINIMUM) zoom=this.MIN_ZOOM_MINIMUM;
		
	var minZoom = zoom;
	var maxZoom = this._calculateMaxZoom(2.1);
	if(maxZoom>2*zoom && zoom>0){
		zoom = zoom*(1+this.ZOOM_CORRECTION_FACTOR*(0.5-zoom/maxZoom));
	}
	if(maxZoom<2*zoom)maxZoom=2*zoom;  
	if(minZoom > this.MIN_ZOOM_MAXIMUM) minZoom=this.MIN_ZOOM_MAXIMUM;
  	
	var mr = null;	
	if(sViewname!="" && (sViewname in this.STANDARD_VIEWS)){
  	mr = e.CreatePosition(e.CreateNodeFromString("Transform{rotation "+this.STANDARD_VIEWS[sViewname]+"}"));
  }else{
		var m2rt = e.CameraPosition.Rotation;
		mr = e.CreatePosition(e.CreateNodeFromString("Transform{rotation "+m2rt.X+" "+m2rt.Y+" "+m2rt.Z+" "+m2rt.Angle+"}"));  				
	}
	var ori = mr.Rotation;	
 
  var f = this._createFieldFromArray("SFVec3f", bb);

  var mc = e.CreatePosition(e.CreateNodeFromString("Transform{translation "+f.X+" "+f.Y+" "+f.Z+"}"));
	
  this._assignValueFromArray(f, new Array(0, 0, zoom));
  var pos = mc.MultVecMatrix(mr.Inverse().MultMatrixVec(f));
    
	var posArray = this._createArrayFromField(pos);
	var oriArray = this._createArrayFromField(ori);
	
	var f = e.CreateField("MFFloat");
  for(var i=0; i<3; i++)
    f.Add(this.navigation_central.Fields.Item("avatarSize").GetValue(i));
  for(var i=0; i<3; i++)
    f.Add(bb[i]);
  this.navigation_central.Fields.Item("avatarSize").Assign(f);  
	
	var syntax = "Viewpoint { position "+posArray.join(' ')+" orientation "+oriArray.join(' ')+" }";
  this.navigation_central.Fields.Item("set_viewpoint").Value = e.CreateNodeFromString(syntax);
  this._set_zoom_limits(minZoom, maxZoom);
}

function IPCApi__setSceneCenterpoint(bb) {
	if(!this.is_loaded || bb == null || bb.length<6 || ((bb[3]==0)&&(bb[4]==0)&&(bb[5]==0)))return;	
	this._assignValueFromArray(this.navigation_central.Fields.Item("set_centerpoint"), bb)
}

function IPCApi_fitToScene(/*[fZoomK]*/) {
  if(!this.is_loaded) return;
  var bb = this._getSceneBBox()
  var fZoomK = 1;
  if(arguments.length > 0)fZoomK = arguments[0];
  this._fitToBoundBox(bb, "", fZoomK);  
}

function IPCApi_hide_background_geometry() {
  if(!this.is_loaded || typeof(this.data.bgmedia)=="undefined" || this.data.bgmedia.length==0) return;
  if(this.bgnodes == null){
  	this.bgnodes={};
  	this.bgnodes.hidden=false;
  	this.bgnodes.list=[];
  	for(var i=0; i<this.data.bgmedia.length; i++){
  		var chField = this.cortona.Engine.Nodes.Item(this.data.bgmedia[i]).Fields.Item("whichChoice");
  		if((chField.Value>=0))
  			this.bgnodes.list.push(chField);
  	}
  }
  if(!this.bgnodes.hidden){
  	this.bgnodes.hidden = true;
  	this.setAutoRefreshOff();
  	for(var i=0; i<this.bgnodes.list.length; i++){
  		this.bgnodes.list[i].Value = -1;
  	}
  	this.restoreAutoRefresh();
  	this.doRefresh();
  }
}
function IPCApi_show_background_geometry() {
  if(!this.is_loaded || this.bgnodes==null) return;
  if(this.bgnodes.hidden){
  	this.bgnodes.hidden = false;
  	this.setAutoRefreshOff();
  	for(var i=0; i<this.bgnodes.list.length; i++){
  		this.bgnodes.list[i].Value = 0;
  	}
  	this.restoreAutoRefresh();
  	this.doRefresh();
  }
  
}

function IPCApi_set_ui_axis(bFlag) {
  if(this.is_loaded){
  	 this.control_script.Fields.Item('set_ui_axis').Value = new Boolean(bFlag);
  	 if(this.axes_switch!=null)this.axes_switch.Fields.Item('whichChoice').Value =(bFlag)? 0: -1;
  }
}

function IPCApi_set_ui_zoom(bFlag) {
  if(this.is_loaded) this.control_script.Fields.Item('set_ui_zoom').Value = new Boolean(bFlag);
}

function IPCApi_set_ui_centerpoint(bFlag)  {
  if(this.is_loaded)
    this.navigation_central.Fields.Item("CenterpointSwitch").Value = bFlag ? 0 : -1;
}

function IPCApi_set_ui_revision(bFlag)  {
  if(this.is_loaded && this.revision_switch!=null){
    var ch = this.revision_switch('children');
    ch.Clear();
    if(bFlag){
    	var _nodes = this.cortona.Engine.CreateVrmlFromString('Panel{backgroundTransparency 0 source HTMLText{body "<font color=\\"#FF0000\\">R</font>"}}');
    	ch.Add(_nodes.GetValue(0));
    }
  }
}

function IPCApi_zoom_reset() {
  if(this.is_loaded) this.control_script.Fields.Item('zoom_reset').Value = 0;
}

function IPCApi_zoom_set_delta(nValue) {
  if(this.is_loaded) this.control_script.Fields.Item('zoom_set_delta').Value = new Number(nValue);
}

function IPCApi_zoom_set_level(nValue) {
  if(this.is_loaded) this.control_script.Fields.Item('zoom_set_level').Value = new Number(nValue);
}

// Print 3D
function IPCApi_checkPrintComponent(){
	try{
		var ccopy = new ActiveXObject("CarbonCopy.CopierX");	
		return true;
	}catch(e){
		return false;
	}	
}

function IPCApi_print3D() {
  var e = _api_b078f91531cd496ea19f383bd8fbf6a5.cortona.Engine;
  var copier;
  try {
    copier = e.Nodes.Item('CORTONA_CARBONCOPIER');
  }
  catch(exception) {
  	copier = e.CreateVrmlFromString(_api_b078f91531cd496ea19f383bd8fbf6a5.COPIER_SYNTAX);
  	e.RootNodes.Add(copier);
  }
  try {
    e.Nodes.Item('CORTONA_CARBONCOPIER').Fields.Item("print").Value = true;
  }
  catch(exception) {}
}

function IPCApi_openPrintPageSetup() {
  var e = _api_b078f91531cd496ea19f383bd8fbf6a5.cortona.Engine;
  var copier;
  try {
    copier = e.Nodes.Item('CORTONA_CARBONCOPIER');
  }
  catch(exception) {
  	copier = e.CreateVrmlFromString(_api_b078f91531cd496ea19f383bd8fbf6a5.COPIER_SYNTAX);
  	e.RootNodes.Add(copier);
  }
  try {
    e.Nodes.Item('CORTONA_CARBONCOPIER').Fields.Item("pageSetup").Value = true;
  }
  catch(exception) {}
}

function ipcApi_setPrintHeaderStyle(aStyle){
	this._copier_field_set_string_array('headerStyle', aStyle);
}
function ipcApi_setPrintFooterStyle(aStyle){
	this._copier_field_set_string_array('footerStyle', aStyle);
}
function ipcApi_setPrintHeader(sText){
	this._copier_field_set_string('headerText', sText);
}
function ipcApi_setPrintFooter(sText){
	this._copier_field_set_string('footerText', sText);
}

function IPCApi__copier_field_set_string(name, str) {
  var e = _api_b078f91531cd496ea19f383bd8fbf6a5.cortona.Engine;
  var copier;
  try {
    copier = e.Nodes.Item('CORTONA_CARBONCOPIER');
  }
  catch(exception) {
  	copier = e.CreateVrmlFromString(_api_b078f91531cd496ea19f383bd8fbf6a5.COPIER_SYNTAX);
  	e.RootNodes.Add(copier);
  }
  try {
    e.Nodes.Item('CORTONA_CARBONCOPIER').Fields.Item(name).Value = str;
  }
  catch(exception) {}
}

function IPCApi_clearAllCallouts(){
	if(this.callouts_group!=null){ 		
	 		this.callouts_group.Fields.Item("children").Clear();
	}
}

function IPCApi__copier_field_set_string_array(name, arr) {
  var e = _api_b078f91531cd496ea19f383bd8fbf6a5.cortona.Engine;
  var copier;
  try {
    copier = e.Nodes.Item('CORTONA_CARBONCOPIER');
  }
  catch(exception) {
  	copier = e.CreateVrmlFromString(_api_b078f91531cd496ea19f383bd8fbf6a5.COPIER_SYNTAX);
  	e.RootNodes.Add(copier);
  }
  
  var f = e.CreateField('MFString');
  for(var i=0; i<arr.length; f.Add(arr[i++]));
  
  try {
    e.Nodes.Item('CORTONA_CARBONCOPIER').Fields.Item(name).Assign(f);
  }
  catch(exception) {}
}


// events
/**
on_part_over(oPart)
on_part_click(oPart, button, shift, X, Y)
on_reset()
on_simulation_load(bSuccess)
on_simulation_unload()
on_start_substep(sProcedure, sStep, sSubstep)
on_vcr_state(nState)
on_proc_fraction_changed(fFractionValue)
on_zoom_changed(fZoomValue)
on_mouse_down(Button, Shift, X, Y)
on_mouse_up(Button, Shift, X, Y)
*/


/*
 * Object IPCPart
 */
 
function IPCPart(aNodesNames, index) {
	this.vrmlNodes = new Array();
	this.withoutGeometry = true;
	for(var i=0; i<aNodesNames.length; i++){
		this.vrmlNodes[i] = _api_b078f91531cd496ea19f383bd8fbf6a5.getVrmlNode(aNodesNames[i]);
		if(this.vrmlNodes[i]!=null){
			if(this.vrmlNodes[i].tag==null)this.vrmlNodes[i].tag=index;
			this.withoutGeometry = false;
		}
	}
}

IPCPart.prototype.restoreVrmlNodesMaterial = IPCPart_restoreVrmlNodesMaterial;
IPCPart.prototype.resetVrmlNodesMaterial = IPCPart_resetVrmlNodesMaterial;
IPCPart.prototype.setEmissiveColor = IPCPart_setEmissiveColor;
IPCPart.prototype.setDiffuseColor = IPCPart_setDiffuseColor;
IPCPart.prototype.setTransparency = IPCPart_setTransparency;
IPCPart.prototype.getTransparency = IPCPart_getTransparency;
IPCPart.prototype.show = IPCPart_show;
IPCPart.prototype.filter = IPCPart_filter;
IPCPart.prototype.fit = IPCPart_fit;
IPCPart.prototype.setCenterpoint = IPCPart_setCenterpoint;

IPCPart.prototype.getVisibility = IPCPart_getVisibility;
IPCPart.prototype.checkFullTransparency = IPCPart_checkFullTransparency;

function IPCPart_restoreVrmlNodesMaterial() {
	if(_api_b078f91531cd496ea19f383bd8fbf6a5.ATP==0){
		this.vrmlNodes.mapv(new Function('n', 'n.restoreMaterial(true);'));
	}else{
		_api_b078f91531cd496ea19f383bd8fbf6a5._xProcessedParts.push([0, this])
	}
}
function IPCPart_resetVrmlNodesMaterial(){
	if(_api_b078f91531cd496ea19f383bd8fbf6a5.ATP==0){
		this.vrmlNodes.mapv(new Function('n', 'n.resetMaterial(true);'));
	}else{
		_api_b078f91531cd496ea19f383bd8fbf6a5._xProcessedParts.push([1, this])
	}
}

function IPCPart_setEmissiveColor(aColor) {
	if(_api_b078f91531cd496ea19f383bd8fbf6a5.ATP==0){
		var f = new Function('n', 'n.setEmissiveColor('+aColor.join(', ')+');');
  		this.vrmlNodes.mapv(f);
	}else{
		_api_b078f91531cd496ea19f383bd8fbf6a5._xProcessedParts.push([2, this, aColor])
	}
}
function IPCPart_setDiffuseColor(aColor) {
	if(_api_b078f91531cd496ea19f383bd8fbf6a5.ATP==0){
		var f = new Function('n', 'n.saveMaterial(true); n.setDiffuseColor('+aColor.join(', ')+');');
  		this.vrmlNodes.mapv(f);
	}else{
		_api_b078f91531cd496ea19f383bd8fbf6a5._xProcessedParts.push([3, this, aColor])
	}
}
function IPCPart_setTransparency(fValue) {
	if(_api_b078f91531cd496ea19f383bd8fbf6a5.ATP==0){
		var f = new Function('n', 'n.saveMaterial(true); n.setTransparency('+fValue+');');
  		this.vrmlNodes.mapv(f);
	}else{
		_api_b078f91531cd496ea19f383bd8fbf6a5._xProcessedParts.push([4, this, fValue])
	}
}
function IPCPart_getTransparency() {
	for(var i=0; i<this.vrmlNodes.length; i++){ 
		if(this.vrmlNodes[0].getTransparency()!=1) 
			return this.vrmlNodes[0].getTransparency();	
	}
	return 0;
}

function IPCPart_show(bFlag) {
	if(_api_b078f91531cd496ea19f383bd8fbf6a5.ATP==0){
		var f = new Function('n', 'n.show('+bFlag+');');
		this.vrmlNodes.mapv(f);
	}else{
		_api_b078f91531cd496ea19f383bd8fbf6a5._xProcessedParts.push([5, this, bFlag])
	}
}
function IPCPart_filter(bFlag) {
	if(_api_b078f91531cd496ea19f383bd8fbf6a5.ATP==0){
		var f = new Function('n', 'n.filter('+bFlag+');');
		this.vrmlNodes.mapv(f);
	}else{
		_api_b078f91531cd496ea19f383bd8fbf6a5._xProcessedParts.push([6, this, bFlag])
	}
}

function IPCPart_fit(/*[sViewname], [fZoomK]*/){
	var fZoomK = 1;
	var sViewname = "";
	if(arguments.length > 0)sViewname = arguments[0];
	if(arguments.length > 1)fZoomK = arguments[1];
  var bb = _api_b078f91531cd496ea19f383bd8fbf6a5._getNodesBoundBox(this.vrmlNodes);
  _api_b078f91531cd496ea19f383bd8fbf6a5._fitToBoundBox(bb, sViewname, fZoomK);
}

function IPCPart_setCenterpoint(/*[sViewname], [fZoomK]*/){
	var fZoomK = 1;
	var sViewname = "";
	if(arguments.length > 0)sViewname = arguments[0];
	if(arguments.length > 1)fZoomK = arguments[1];
  var bb = _api_b078f91531cd496ea19f383bd8fbf6a5._getNodesBoundBox(this.vrmlNodes);
  _api_b078f91531cd496ea19f383bd8fbf6a5._setSceneCenterpoint(bb);
}

function IPCPart_getVisibility(){
	var f = new Function('n', 'return n.getVisibility();');
	return this.vrmlNodes.map(f).or();
}

function IPCPart_checkFullTransparency(){
	var f = new Function('n', 'return (n.isHidden());');	
	return this.vrmlNodes.map(f).and();	
}

/*
 * Object IPCViewpoint
 */
 
function IPCViewpoint(name, vrmlnode) {
  this.description = name;
  this.node = vrmlnode;
  
  if(this.description == "")
    this.description = "unnamed"
}


/*
 * Object IPCVrmlNodeMaterial
 */
 
function IPCVrmlNodeMaterial(node, objectvm) {
	this.materialnode = node;
	this.nodecolors = [];
	this.colorfield = null;
	try{
		var cr = objectvm.Fields.Item("currentRepresentation").Value;
		if(cr>=0 && objectvm.Fields.Item("representations").Count>cr){
			var geometry = objectvm.Fields.Item("representations").GetValue(cr).Fields.Item("geometry").Value;
			if(geometry.TypeName=="IndexedFaceSet"){
				var clrnode = geometry.Fields.Item("color").Value;
				if(clrnode){
					this.colorfield = clrnode.Fields.Item("color");
					for(var i=0; i<this.colorfield.Count; i++){
						this.nodecolors.push(this.colorfield.GetValue(i));
					}
				}
			}
		}
	}catch(e){}
  var dfColor = node.Fields.Item("diffuseColor");
  this.diffuseColor = new Array(dfColor.Red, dfColor.Green, dfColor.Blue);
  //this.emissiveColor = new Array(node.Fields.Item("emissiveColor").Red, node.Fields.Item("emissiveColor").Green, node.Fields.Item("emissiveColor").Blue);
  this.transparency = node.Fields.Item("transparency").Value;
}
IPCVrmlNodeMaterial.prototype.resetDiffuseColor = IPCVrmlNodeMaterial_resetDiffuseColor;
IPCVrmlNodeMaterial.prototype.resetMaterial = IPCVrmlNodeMaterial_resetMaterial;

function IPCVrmlNodeMaterial_resetDiffuseColor() {
  _api_b078f91531cd496ea19f383bd8fbf6a5._assignValueFromArray(this.materialnode.Fields.Item("diffuseColor"), this.diffuseColor);
  if(this.colorfield != null){
  	  for(var i=0; i<this.colorfield.Count; i++){
  	  	try{
	  		this.colorfield.SetValue(i, this.nodecolors[i]);
	  	}catch(e){}
	  }
  }
}

function IPCVrmlNodeMaterial_resetMaterial() {
  this.resetDiffuseColor();
  this.materialnode.Fields.Item("transparency").Value = this.transparency;
}
 
/*
 * Object IPCVrmlNode
 */

var _processed_Vrml_Nodes = {}; 

function IPCVrmlNode(node) {
  this.node = node;
  if(arguments.length > 1)
    this.name = arguments[1];
  else
    this.name = node.Name;

    this.tag = null;

    this._materialSaved = false;
    this.show_flag=true;
	this.filter_flag=false;
}
IPCVrmlNode.prototype.isEqual = IPCVrmlNode_isEqual;
IPCVrmlNode.prototype.getBBox = IPCVrmlNode_getBBox;
IPCVrmlNode.prototype.setEmissiveColor = IPCVrmlNode_setEmissiveColor;
IPCVrmlNode.prototype.setDiffuseColor = IPCVrmlNode_setDiffuseColor;
IPCVrmlNode.prototype.show = IPCVrmlNode_show;
IPCVrmlNode.prototype.filter = IPCVrmlNode_filter;
IPCVrmlNode.prototype.setTransparency = IPCVrmlNode_setTransparency;
IPCVrmlNode.prototype.getTransparency = IPCVrmlNode_getTransparency;
IPCVrmlNode.prototype.getVisibility = IPCVrmlNode_getVisibility;
IPCVrmlNode.prototype.getSwitchState = IPCVrmlNode_getSwitchState;
IPCVrmlNode.prototype.checkFullTransparency = IPCVrmlNode_checkFullTransparency;
IPCVrmlNode.prototype.hasGeometry = IPCVrmlNode_hasGeometry;
IPCVrmlNode.prototype.isHidden = IPCVrmlNode_isHidden;

IPCVrmlNode.prototype.getAllChildren = IPCVrmlNode_getAllChildren;
IPCVrmlNode.prototype.getParentsNames = IPCVrmlNode_getParentsNames;

IPCVrmlNode.prototype.saveMaterial = IPCVrmlNode_saveMaterial;
IPCVrmlNode.prototype.restoreMaterial = IPCVrmlNode_restoreMaterial;
IPCVrmlNode.prototype.resetMaterial = IPCVrmlNode_resetMaterial;

function IPCVrmlNode_isEqual(oVrmlNode) {
  var ret = false;
  try {
    ret = ((oVrmlNode.constructor == IPCVrmlNode) && (oVrmlNode.node == this.node));
  }
  catch(exception) {}
  return ret;
}

function IPCVrmlNode_getBBox() {
  var bb = _api_b078f91531cd496ea19f383bd8fbf6a5._GetVRMLBBox_Array(this.node);
  
  var e = _api_b078f91531cd496ea19f383bd8fbf6a5.cortona.Engine;
  var m = e.CreatePosition(null);
  
  var p1 = _api_b078f91531cd496ea19f383bd8fbf6a5._createFieldFromArray("SFVec3f", new Array((bb[0] - bb[3]/2), (bb[1] - bb[4]/2), (bb[2] - bb[5]/2)));
  var p2 = _api_b078f91531cd496ea19f383bd8fbf6a5._createFieldFromArray("SFVec3f", new Array((bb[0] + bb[3]/2), (bb[1] + bb[4]/2), (bb[2] + bb[5]/2)));
  for(var n = this.node.Fields.Item("_parent_").Value; n != null; n = n.Fields.Item("_parent_").Value) {
  	if(n.Fields.Item("whichChoice").Value<0)return new Array(0, 0, 0, 0, 0, 0);
    m.SetTransform(n);
    p1 = m.MultVecMatrix(p1);
    p2 = m.MultVecMatrix(p2);
  }
  p1 = _api_b078f91531cd496ea19f383bd8fbf6a5._createArrayFromField(p1);
  p2 = _api_b078f91531cd496ea19f383bd8fbf6a5._createArrayFromField(p2);
  
  bb = new Array((p1[0] + p2[0])/2, (p1[1] + p2[1])/2, (p1[2] + p2[2])/2, Math.abs(p2[0] - p1[0]), Math.abs(p2[1] - p1[1]), Math.abs(p2[2] - p1[2]));
  return bb;
}

function IPCVrmlNode_setEmissiveColor(fRed, fGreen, fBlue) {
  _api_b078f91531cd496ea19f383bd8fbf6a5._assignValueFromArray(this.node.Fields.Item("appearance").Value.Fields.Item("material").Value.Fields.Item("emissiveColor"), arguments);
}


function IPCVrmlNode_setDiffuseColor(fRed, fGreen, fBlue) {
	function _set_ifs_color(objectvm, fcolor){
		try{
		  var cr = objectvm.Fields.Item("currentRepresentation").Value;
		  if(cr>=0 && objectvm.Fields.Item("representations").Count>cr){
				var geometry = objectvm.Fields.Item("representations").GetValue(cr).Fields.Item("geometry").Value;
				if(geometry.TypeName=="IndexedFaceSet"){
					var clrnode = geometry.Fields.Item("color").Value;
					if(clrnode){
						var colorfield = clrnode.Fields.Item("color");
						for(var i=0; i<colorfield.Count; i++){
							colorfield.SetValue(i, fcolor);
						}
					}
				}
			}
		}catch(e){}
	}
	
  var fcolor = _api_b078f91531cd496ea19f383bd8fbf6a5.cortona.Engine.CreateField('SFColor');
  fcolor.Red = new Number(fRed);
  fcolor.Green = new Number(fGreen);
  fcolor.Blue = new Number(fBlue);
  _set_ifs_color(this.node, fcolor);
  _api_b078f91531cd496ea19f383bd8fbf6a5._assignValueFromArray(this.node.Fields.Item("appearance").Value.Fields.Item("material").Value.Fields.Item("diffuseColor"), arguments);
  var allCh = this.getAllChildren();
  for(var i=0; i<allCh.length; i++){
  	_api_b078f91531cd496ea19f383bd8fbf6a5._assignValueFromArray(allCh[i].node.Fields.Item("appearance").Value.Fields.Item("material").Value.Fields.Item("diffuseColor"), arguments);
  	_set_ifs_color(allCh[i].node, fcolor);
  }
}

function IPCVrmlNode_setTransparency(fValue) {
	if(fValue==1)return;
	if(this.getTransparency()!=1)_api_b078f91531cd496ea19f383bd8fbf6a5._assignValueFromArray(this.node.Fields.Item("appearance").Value.Fields.Item("material").Value.Fields.Item("transparency"), arguments);
  var allCh = this.getAllChildren();
  for(var i=0; i<allCh.length; i++){
  	if(allCh[i].node.Fields.Item("appearance").Value.Fields.Item("material").Value.Fields.Item("transparency").Value!=1)
  		_api_b078f91531cd496ea19f383bd8fbf6a5._assignValueFromArray(allCh[i].node.Fields.Item("appearance").Value.Fields.Item("material").Value.Fields.Item("transparency"), arguments);
  }
}

function IPCVrmlNode_getTransparency() {
  return this.node.Fields.Item("appearance").Value.Fields.Item("material").Value.Fields.Item("transparency").Value;
}

function IPCVrmlNode_show(bShow) {
	this.show_flag=bShow;
	if(!this.filter_flag){
  	this.node.Fields.Item("whichChoice").Value = bShow ? 0 : -1;
  }
}
function IPCVrmlNode_filter(bFilter) {
	this.filter_flag=bFilter;	
  this.node.Fields.Item("whichChoice").Value = (this.show_flag && !bFilter) ? 0 : -1;
}

function IPCVrmlNode_getSwitchState() {
	return (this.node.Fields.Item("whichChoice").Value >= 0);
}

function IPCVrmlNode_getVisibility(){
	if(this.getSwitchState()){
		if(!this.parentsNodes){
			this.parentsNodes = new Array();
		  var _parent = this.node.Fields.Item("_parent_").Value;
		  while(_parent!=null){
		  	this.parentsNodes.push(_parent);
		  	_parent = _parent.Fields.Item("_parent_").Value;
		  }
		}
		for(var i=0; i<this.parentsNodes.length; i++){
			if(this.parentsNodes[i].Fields.Item("whichChoice").Value < 0) return false;
		}	
		
		if(this.hasGeometry() && !this.checkFullTransparency()){
			return true;
		}else{
			this.getAllChildren();
			for(var i=0; i<this.children.length; i++){
				if(this.children[i].getVisibility())return true;
			}
		}
	}
	return false;
}

function IPCVrmlNode_isHidden(){
	var f = new Function('n', 'return (!n.hasGeometry() || n.checkFullTransparency());');	
	return (!this.hasGeometry() || this.checkFullTransparency()) && this.getAllChildren().map(f).and();
}

function IPCVrmlNode_checkFullTransparency() {
		return (this.node.Fields.Item("appearance").Value.Fields.Item("material").Value.Fields.Item("transparency").Value == 1);
}

function IPCVrmlNode_hasGeometry() {
  return (this.node.Fields.Item("representations").Count>0);
}

function IPCVrmlNode_getAllChildren(){
	if(!this.allChildren){
		if(this.name != ""){
			_processed_Vrml_Nodes[this.name] = this;
		}
		this.children = new Array();
		var childrenField = this.node.Fields.Item("children");
		for(var i=0; i<childrenField.Count; i++){
			var nm = childrenField.GetValue(i).Name;
			if((nm != "") && (nm in _processed_Vrml_Nodes)){
				this.children.push(_processed_Vrml_Nodes[nm]);
			}else{
				if(childrenField.GetValue(i).TypeName == "ObjectVM") {
					this.children.push(_api_b078f91531cd496ea19f383bd8fbf6a5._createVrmlNode(childrenField.GetValue(i), nm));				
				}
			}
		}
		this.allChildren = this.children;
		for(var i=0; i<this.children.length; i++){
			this.allChildren = this.allChildren.concat(this.children[i].getAllChildren());
		}
	}
	return this.allChildren;
}

function IPCVrmlNode_getParentsNames(){
  this.parents = new Array();
  this.parentsNames = new Array();
  var _parent = this.node.Fields.Item("_parent_").Value;
  while(_parent!=null){
  	this.parents.push(_parent);
  	this.parentsNames.push(_parent.Name);
  	_parent = _parent.Fields.Item("_parent_").Value;
  }
  return this.parentsNames;  
}

function IPCVrmlNode_saveMaterial(withChildren){	
	if(!this._materialSaved){		
		this.vrmlMaterial = new IPCVrmlNodeMaterial(this.node.Fields.Item("appearance").Value.Fields.Item("material").Value, this.node);
		this._materialSaved = true;
  }  
	if(withChildren){
		var allCh = this.getAllChildren();
		allCh.mapv(new Function('n', 'n.saveMaterial(false);'));
	}
}
function IPCVrmlNode_restoreMaterial(withChildren){
	if(this._materialSaved){
		this.vrmlMaterial.resetDiffuseColor();
  }
	if(withChildren){
		var allCh = this.getAllChildren();
		allCh.mapv(new Function('n', 'n.restoreMaterial(false);'));
	}
}
function IPCVrmlNode_resetMaterial(withChildren){
	if(this._materialSaved){
		this.vrmlMaterial.resetMaterial();
		this._materialSaved = false;
  }
	if(withChildren){
		var allCh = this.getAllChildren();
		allCh.mapv(new Function('n', 'n.resetMaterial(false);'));
	}
}

/*
 * Object IPCViews
 */
 
function IPCViews() {
  this.array = {};
  this.initialViewName = null;
}

IPCViews.prototype.clear = IPCViews_clear;
IPCViews.prototype.add = IPCViews_add;
IPCViews.prototype.remove = IPCViews_remove;
IPCViews.prototype.get = IPCViews_get;
IPCViews.prototype.exists = IPCViews_exists;
IPCViews.prototype.findPath = IPCViews_findPath;
IPCViews.prototype.loadFromData = IPCViews_loadFromData;

function IPCViews_clear() {
  this.array = {};
}

function IPCViews_add(oIPCView) {
  this.array[oIPCView.name] = oIPCView;
}

function IPCViews_remove(oIPCView) {
  delete this.array[oIPCView.name];
}

function IPCViews_get(name) {
  return this.array[name];
}

function IPCViews_exists(name) {
  return(typeof(this.array[name]) != 'undefined');
}

function IPCViews_findPath(nameSrc, nameDst) {
  var path = new Array();
  var t = {};
  for(var v in this.array)
    t[v] = -1;
  t[nameSrc] = 0;
  for(var found = false, time = 0, oldfront = new Array(nameSrc), newfront = new Array(); !found; oldfront = newfront, newfront = new Array(), time++) {
    for(var i=0; i<oldfront.length; i++) {
      for(var k in this.array[oldfront[i]].transitionsList) {
        if(t[k] < 0) {
          t[k] = time + 1;
          newfront.push(k);
          if(k == nameDst)
            found = true;
        }
      }
    }
    if(newfront.length == 0) 
      return path;
  }
  var z = nameDst;
  while(z != nameSrc) {
    var zt = t[z] - 1;
    var found = false; 
    for(var k in this.array) {
      for(var m in this.array[k].transitionsList) {
        if(m == z && t[k] == zt) {
          z = k;
          path.push(this.array[k].transitionsList[m]);
          found = true;
          break;
        }
      }
      if(found)   break;
    }
  }
  path.reverse();
  return path;
}


function IPCViews_loadFromData(viewsArray, dpl) {
	var e = _api_b078f91531cd496ea19f383bd8fbf6a5.cortona.Engine;
	var startView = null;
  this.clear();
 	var n = viewsArray;
  for(var i=0; i<n.length; i++) {
    var transitions = {};
    var t = n[i].transitions;
    for(var j=0; j<t.length; j++) {
      transitions[t[j].id] = new IPCTransition(t[j].stepid, t[j].id, new Array(), false);
    }
    
    var nodes = {};
    var p = n[i].items;
    for(var j=0; j<p.length; j++){
      if(p[j]!=""){
      	var part = _api_b078f91531cd496ea19f383bd8fbf6a5.getIPCPart(p[j]);
      	if(part!=null){
	      	for(var z=0; z<part.vrmlNodes.length; z++){    
	        	nodes[p[j]+"_"+z] = part.vrmlNodes[z];
	      	}
      	}
      }
    }

    var id = n[i].stepid;
    var name = n[i].id;
    var description = n[i].description;
    var autolevel = 0;
    var viewpoints = new Array();    
    try{
    	var p = n[i].viewpoint;
    	viewpoints.push(new IPCViewpoint(p.name, e.Nodes.Item(p.vrmlnode)));
  	}catch(e){}
    
    var view = new IPCView(id, name, description, autolevel, nodes, transitions, viewpoints);
    this.add(view);
    
    if((startView == null)&& !n[i].hidden) startView = view;
  }
  if(startView==null){
  	alert("Error: There are no IPC sheets in project.");
  	return;
  }
  this.initialViewName = startView.name;
  _api_b078f91531cd496ea19f383bd8fbf6a5.initialViewName = this.initialViewName;
  
  
  for(var key in this.array) {
    var view = this.array[key];
    for(var trname in view.transitionsList) {
      if(this.exists(trname)) {
        var trview = this.get(trname);
        if(typeof(trview.transitionsList[view.name]) == 'undefined') {
          trview.transitionsList[view.name] = new IPCTransition(view.transitionsList[trname].id, view.name, new Array(), true);
        }
      }
    }
  }
}

/*
 * Object IPCView
 */
 
function IPCView(id, name, description, autolevel, nodes_assoc, transitions_assoc, viewpoints_assoc) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.autoLevelFlags = autolevel;
  this.nodesList = nodes_assoc;
  this.transitionsList = transitions_assoc;
  this.viewpointsList = viewpoints_assoc;
}
IPCView.prototype.getTransitionViewForTrigger = IPCView_getTransitionViewForTrigger; 
IPCView.prototype.getTriggersList = IPCView_getTriggersList; 

function IPCView_getTransitionViewForTrigger(oVrmlNode) {
  for(var key in this.transitionsList) {
    var a = this.transitionsList[key].triggersArray;
    for(var i=0; i<a.length; i++) {
      if(a[i].isEqual(oVrmlNode)) {
        return _api_b078f91531cd496ea19f383bd8fbf6a5.IPCViewList.get(key);
      }
    }
  }
  return null;
}

function IPCView_getTriggersList() {
  var a = new Array();
  for(var key in this.transitionsList)
    a = a.concat(this.transitionsList[key].triggersArray);
  return a;
}

/*
 * Object IPCTransition
 */
 
function IPCTransition(id, name, vrml_nodes, reverse) {
  this.id = id;
  this.name = name;
  this.reverse = reverse;
  this.triggersArray = vrml_nodes;
}


/******************************************************************************************************************/
function TooltipOver3D(tooltip) 
{
  this.tooltip = tooltip;
  
  this.tooltipHTML = "";
  
  this.tooltipWin = window.createPopup();
  
  this.TOOLTIP_DX = 15;
  this.TOOLTIP_DY = 20;
  
  var pp_win_body = this.tooltipWin.document.body;
  pp_win_body.style.backgroundColor = "#FFFFDD";
  pp_win_body.style.border          = "black solid 1px";
  pp_win_body.style.padding         = "3px 3px 3px 3px";
  pp_win_body.style.fontSize        = "9pt";
  pp_win_body.style.fontFamily      = "tahoma, sans-serif";
  pp_win_body.style.textAlign       = "center";

TooltipOver3D.prototype.show =
  function TooltipOver3D_show_tooltip() 
  {
    if(this.tooltipHTML != "") 
    {
      this.tooltip.innerHTML = this.tooltipHTML;
      
      var w = cortona.offsetWidth;
      var h = cortona.offsetHeight;
      
      var dx = tooltip.offsetWidth;
      var dy = tooltip.offsetHeight;
      
      var x = this.x + this.TOOLTIP_DX;
      var y = this.y + this.TOOLTIP_DY;
      
      if(x+dx > w)  x = w - dx;
      if(y+dy > h)  y = h - dy;
    
      this.tooltipWin.document.body.innerHTML = this.tooltipHTML;
      this.tooltipWin.show(x, y, dx, dy, cortona);
    }
  }

TooltipOver3D.prototype.hide = 
  function TooltipOver3D_hide_tooltip() 
  {
  	this.tooltipWin.hide();
  }

TooltipOver3D.prototype.setTooltipHTML = 
  function TooltipOver3D_setTooltipHTML(syntax) 
  {
    this.tooltipHTML = syntax;
  }

TooltipOver3D.prototype.setXY = 
  function TooltipOver3D_setXY(x, y) 
  {
    this.x = x;
    this.y = y;
  }
}

function TooltipIn3D() 
{
  this.tooltipHTML = "";
  this.groupNode = null;
  this.x = 0;
  this.y = 0;
  this.TOOLTIP_DX = 15;
  this.TOOLTIP_DY = 20;

TooltipIn3D.prototype.show =
  function TooltipIn3D_show_tooltip() 
  {
	if(_api_b078f91531cd496ea19f383bd8fbf6a5.is_loaded && this.tooltipHTML != "" && (this.x!=0 || this.y!=0)) 
    {
    	var e = _api_b078f91531cd496ea19f383bd8fbf6a5.cortona.Engine;
    	if(this.groupNode == null){
			this.groupNode = e.CreateVrmlFromString("Group{}").GetValue(0);
			e.RootNodes.Add(this.groupNode);
    		
    	}
    	var w = _api_b078f91531cd496ea19f383bd8fbf6a5.cortona.clientWidth;
      	var h = _api_b078f91531cd496ea19f383bd8fbf6a5.cortona.clientHeight;      	
      	var syntax = 'Panel{top "-500" left "-500" source HTMLText{body "<font face=\\"tahoma, sans-serif\\" color=\\"#000000\\">'+this.tooltipHTML+'</font>" padding [3, 3, 3, 3]}borderSize 1}';
		var node = e.CreateVrmlFromString(syntax).GetValue(0);
		this.groupNode.Fields.Item("children").Add(node);
		
		var contentSize = node.Fields.Item("contentSize");
		var sX = contentSize.GetValue(0)+2;
		var sY = contentSize.GetValue(1)+2;
		
		this.groupNode.Fields.Item("children").Clear();
		var x = this.x + this.TOOLTIP_DX;
  		var y = this.y + this.TOOLTIP_DY;
  		if(x+sX>w)x = this.x - this.TOOLTIP_DX - sX;
  		if(y+sY>h)y = this.y - this.TOOLTIP_DY - sY;
		var syntax = 'Panel{left "'+x+'" top "'+y+'" width "'+sX+'" height "'+sY+'" source HTMLText{body "<font face=\\"tahoma, sans-serif\\" color=\\"#000000\\">'+this.tooltipHTML+'</font>" padding [3, 3, 3, 3]}backgroundTransparency 0 backgroundColor 1 1 .87 borderColor 0 0 0 borderSize 1}';
		var node = e.CreateVrmlFromString(syntax).GetValue(0);
		this.groupNode.Fields.Item("children").Add(node);
    }
  }

TooltipIn3D.prototype.hide = 
  function TooltipIn3D_hide_tooltip() 
  {
  	  if(this.groupNode != null){
  	  	this.groupNode.Fields.Item("children").Clear();
  	  }
  }

TooltipIn3D.prototype.setTooltipHTML = 
  function TooltipIn3D_setTooltipHTML(syntax) 
  {
    this.tooltipHTML = syntax.replace(/\\/g, '\\\\').replace(/\"/g, "\\\"");
  }

TooltipIn3D.prototype.setXY = 
  function TooltipIn3D_setXY(x, y) 
  {
    this.x = x;
    this.y = y;
  }
}

/******************************************************************************************************************/

/*
 * Object Callout3D
 */
 
 
function Callout3D(sText, X1, Y1, X2, Y2) {
	this.visible = false;
  this.text = sText.replace(/\\/g, '\\\\').replace(/\"/g, "\\\"");
  var e = _api_b078f91531cd496ea19f383bd8fbf6a5.cortona.Engine;
  this.point1 = e.GetProjectedPoint(X1, Y1, "1");
  this.point2 = e.GetProjectedPoint(X2, Y2, "1");
  this.node = null;
  this.id="N"+Math.random();
}
Callout3D.prototype.show = function(){
	if(!this.visible){
		var e = _api_b078f91531cd496ea19f383bd8fbf6a5.cortona.Engine;
		if(_api_b078f91531cd496ea19f383bd8fbf6a5.callouts_group==null){ 		
	 		_api_b078f91531cd496ea19f383bd8fbf6a5.callouts_group = e.CreateVrmlFromString('ZGroup{check FALSE}').GetValue(0);
	    e.RootNodes.Add(_api_b078f91531cd496ea19f383bd8fbf6a5.callouts_group);
		}
		var p1 = this.point1.X+" "+this.point1.Y+" "+this.point1.Z;
		var p2 = this.point2.X+" "+this.point2.Y+" "+this.point2.Z;
		var syntax = 'Callout3D{id "'+this.id+'" p1 '+p1+' p2 '+p2+' point ['+p1+', '+p2+']body "<font face=\\"Courier, monospace\\" size=\\"'+_api_b078f91531cd496ea19f383bd8fbf6a5.CALLOUT_FONT_SIZE+'\\" color=\\"#000000\\">'+this.text+'</font>" color '+_api_b078f91531cd496ea19f383bd8fbf6a5.CALLOUT_COLOR[0]+' '+_api_b078f91531cd496ea19f383bd8fbf6a5.CALLOUT_COLOR[1]+' '+_api_b078f91531cd496ea19f383bd8fbf6a5.CALLOUT_COLOR[2]+'}';
		this.node = e.CreateVrmlFromString(_api_b078f91531cd496ea19f383bd8fbf6a5.CALLOUT_PROTO+syntax).GetValue(0);
		_api_b078f91531cd496ea19f383bd8fbf6a5.callouts_group.Fields.Item("children").Add(this.node);
		this.visible = true;
	}
}

Callout3D.prototype.setPoint1 = function(x, y){
	var e = _api_b078f91531cd496ea19f383bd8fbf6a5.cortona.Engine;
	this.point1 = e.GetProjectedPoint(x, y, "1");
	if(this.visible){		
		this.hide();
		this.show();
	}
}
Callout3D.prototype.setPoint2 = function(x, y){
	var e = _api_b078f91531cd496ea19f383bd8fbf6a5.cortona.Engine;
	this.point2 = e.GetProjectedPoint(x, y, "1");
	if(this.visible){		
		this.hide();
		this.show();
	}	
}
Callout3D.prototype.setText = function(sText){
	this.text = sText.replace(/\\/g, '\\\\').replace(/\"/g, "\\\"");
	if(this.visible){		
		this.hide();
		this.show();
	}	
}
Callout3D.prototype.hide = function(){
	if(this.visible){
		var ch = _api_b078f91531cd496ea19f383bd8fbf6a5.callouts_group.Fields.Item("children");
		for(var i=0; i<ch.Count; i++){
			if(ch.GetValue(i).Fields.Item('id').Value==this.id){
				try{
					ch.Remove(i);
				}catch(e){}
				break;
			}
		}
		this.node=null;
		this.visible = false;	
	}
}


/******************************************************************************************************************/

Array.prototype.map = 
  function Array_map(f) 
  {
    var result = new Array();
    result.length = this.length;
  	for(var i=0; i<this.length; i++)
  		result[i] = f(this[i]);
  	return result;
  }

Array.prototype.mapv =
  function Array_mapv(f) 
  {
  	for(var i=0; i<this.length; i++)
  		f(this[i]);
  	return this;
  }

Array.prototype.or = 
  function Array_or() 
  {
  	for(var i=0; i<this.length; i++)
  	  if(this[i])
  	    return true;
  	return false;
  }

Array.prototype.and =
  function Array_and() 
  {
  	for(var i=0; i<this.length; i++)
  	  if(!this[i])
  	    return false;
  	return true;
  }