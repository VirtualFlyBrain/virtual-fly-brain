import React, { Component } from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Slider from '@material-ui/core/Slider';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { getResultsSOLR } from '../configuration/SOLRclient'
import ADJUST_ICON from "../../assets/viewer/adjust_icon.svg";
import LOCATION_ICON from "../../assets/viewer/location_icon.svg";
import vars from '../../theme/variables';

export const UPDATE_CIRCUIT_QUERY = 'UPDATE_CIRCUIT_QUERY';

const {
  whiteColor,
  secondaryBg,
  primaryBg,
  secondaryBtnColor,
  primaryFont,
  sliderRailBgColor
} = vars;
/**
 * Create a local theme to override some default values in material-ui components
 */
const theme = createMuiTheme({
  props: { MuiSvgIcon: { htmlColor: whiteColor, } },
  overrides : {
    MuiSlider: {
      markLabelActive: { color: whiteColor },
      markLabel: { color: whiteColor }
    }
  },
  typography: { fontFamily : [primaryFont, "sans-serif"] }
});

/**
 * Styling changes that can't be applied to theme to avoid making it global
 */
const styles = theme => ({
  root: { 
    position: "absolute",
    bottom: 0,
    zIndex: 100,
    maxWidth : "16.25rem",
    background: secondaryBg,
    color : "white",
    marginBottom: "1rem !important",
    "&.MuiAccordion-rounded:last-child": {
      borderRadius: "0.375rem"
    },
    "& .MuiAccordionSummary-root": {
      padding: "0.75rem 1rem",
      minHeight: "2.625rem"
    },
    "& .MuiAccordionSummary-content": {
      margin: 0
    },
    "& .MuiAccordionDetails-root": {
      padding: "0 1rem 0.75rem 1rem"
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none"
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none"
    },
    "& .MuiInputBase-input": {
      borderRadius: "0.25rem",
      fontSize: "0.75rem"
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none"
    },
    "& .MuiAutocomplete-inputRoot": {
      paddingBottom: "0 !important"
    },
    "& .MuiDivider-root": {
      backgroundColor: primaryBg,
      margin: "0 1rem"
    },
    "& .MuiAccordionActions-root": {
      padding: "0.75rem 1rem"
    },
    "& .MuiSlider-root": {
      padding: "0.313rem 0"
    },
    "& .MuiSlider-rail": {
      backgroundColor: sliderRailBgColor,
      borderRadius: "unset"
    },
    "& .MuiSlider-marked": {
      marginBottom: 0 
    },
    "& .MuiSlider-mark": {
      width: "1px",
      backgroundColor: whiteColor,
      borderRadius: "unset"
    },
    "& .MuiSlider-markLabel": {
      fontSize: "0.625rem",
      top: "0.625rem",
      transform: "none"
    },
    "& .MuiButton-root": {
      padding: "0.5rem 1rem",
      lineHeight: "1rem",
      fontWeight: 500,
      fontSize: "0.75rem",
      boxShadow: "none",
      textTransform: "none",
      minWidth: "6.813rem"
    },
    "& #neuronFieldsGrid> :first-child": {
      paddingBottom: "0.75rem"
    },
    boxShadow: "none"
  },
  expanded: { minHeight : "15px !important", margin : "0px !important" },
  // Override default padding in Add Neuron button
  addNeuron : { padding : 0 },
  reverseNeurons : { padding : "0 !important" },
  // Override default padding in Delete Neuron button
  deleteNeuron : { padding : "2vh 0px 0px 4px" },
  dottedIcon : { margin : "0.25rem 0 0.25rem 0 " },
  legend : {
    padding: "0.75rem 1rem",
    listStyleType : "none",
    position: "absolute",
    right : "1rem",
    backgroundColor : "#3A3A3A",
    borderRadius: '0.4rem',
    zIndex: 100,
    fontSize: '0.875rem'
  },
  legendItem :{
    position: "relative",
    display : "inline-block",
    marginRight : "0.5rem",
    height : "0.875rem",
    width : "0.875rem",
    borderRadius: "2px"
  },
  weightInput : { 
    color : "white !important",
    height : "20px",
    border : "none !important",
    backgroundColor: "#80808040 !important",
    paddingLeft : "10px !important",
    fontSize : "15px !important"
  },
  weightInputDiv : { width : "100% !important" },
  refreshButton : {
    backgroundColor : secondaryBtnColor,
    "&:hover": {
      backgroundColor: secondaryBtnColor
    }
  },
  clearButton : {
    color : secondaryBtnColor,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  slider : { color: secondaryBtnColor },
  typography : { fontSize : "0.75rem", lineHeight: "1rem" }
});

/**
 * Read configuration from circuitBrowserConfiguration
 */
import { configuration } from '../configuration/VFBCircuitBrowser/circuitBrowserConfiguration';
import { styling } from '../configuration/VFBCircuitBrowser/circuitBrowserConfiguration';
import { Neo4jLabels } from '../configuration/VFBCircuitBrowser/circuitBrowserConfiguration';

import { searchConfiguration } from '../configuration/SOLRclient';
import { defaultDatasourceConfiguration } from '../configuration/SOLRclient';


/**
 * Create custom marks for Paths slider.
 * Only show the label for the minimum and maximum paths, hide the rest
 */
const customMarks = () => {
  let marks = new Array(configuration.maxPaths);
  for ( var i = 0; i < marks.length; i++ ) {
    if ( i == 0 || i == marks.length - 1 ) {
      marks[i] = { value : i + 1, label : (i + 1).toString() };
    } else {
      marks[i] = { value : i + 1 };
    }
  }
  
  return marks;
}

class AutocompleteResults extends Component {
  constructor (props) {
    super(props);
    this.state = { filteredResults: {} };
    this.handleResults = this.handleResults.bind(this);
    this.fieldLabel = this.props.field.label;
  }
  
  /**
   * Receives SOLR results and creates an map with those results that match the input text
   */
  handleResults (status, data, value){
    let results = {};
    data?.map(result => {
      results[result?.label] = result;
    });
          
    this.setState({ filteredResults : results });
  }
  
  clearResults () {
    this.setState({ filteredResults : {} });  
  }
  
  getFilteredResults (){
    return this.state.filteredResults;
  }
  
  shouldComponentUpdate (nextProps, nextState) {
    this.fieldLabel = nextProps.getLatestNeuronFields()[this.props.index].label;
    return true;
  }
  
  render () {
    const label = "Neuron " + (this.props.index + 1) .toString();
    const options = Object.keys(this.state.filteredResults).map(option => this.state.filteredResults[option].label);
    
    return (
      <Autocomplete
        fullWidth
        freeSolo
        disableClearable
        clearOnEscape
        disablePortal
        autoHighlight
        clearOnBlur
        value={this.fieldLabel}
        id={this.props.index.toString()}
        ListboxProps={{ style: { maxHeight: "10rem", fontSize: "15px" } }}
        onChange={this.props.resultSelectedChanged}
        options={Object.keys(this.state.filteredResults).map(option => this.state.filteredResults[option].label)}
        renderInput={params => (
          <TextField
            {...params}
            key={this.props.field.id}
            className={label.replace(/ +/g, "").toLowerCase()}
            onChange={this.props.neuronTextfieldModified}
            onDelete={this.props.neuronTextfieldModified}
            placeholder={label}
            inputProps={{ ...params.inputProps, id: this.props.index, style: { height : "1rem", color: "white" ,padding : "8px 7px", fontSize: "0.75rem", border : "none", backgroundColor: primaryBg } }}
            InputLabelProps={{ ...params.inputProps,style: { color: "white", fontSize: "0.75rem" } }}
          />
        )}
      />
    )
  }
}

/**
 * Controls component used in VFBCircuitBrowser.
 */
class Controls extends Component {

  constructor (props) {
    super(props);
    this.state = {
      typingTimeout: 0,
      expanded : true,
      key : 1
    };
    this.weight = this.props.weight;
    this.paths = this.props.paths;
    this.addNeuron = this.addNeuron.bind(this);
    this.reverseNeurons = this.reverseNeurons.bind(this);
    this.neuronTextfieldModified = this.neuronTextfieldModified.bind(this);
    this.typingTimeout = this.typingTimeout.bind(this);
    this.sliderChange = this.sliderChange.bind(this);
    this.weightChange = this.weightChange.bind(this);
    this.fieldsValidated = this.fieldsValidated.bind(this);
    this.deleteNeuronField = this.deleteNeuronField.bind(this);
    this.getUpdatedNeuronFields = this.getUpdatedNeuronFields.bind(this);
    this.resultSelectedChanged = this.resultSelectedChanged.bind(this);
    this.datasourceConfiguration = defaultDatasourceConfiguration; 
    this.setNeurons = this.setNeurons.bind(this);
    this.circuitQuerySelected = this.props.circuitQuerySelected;
    this.autoCompleteInput = React.createRef();
    this.neuronFields = [{ id : "", label : "" } , { id : "", label : "" }];
    this.createRefs = this.createRefs.bind(this);
    this.createRefs();
  }
  
  createRefs () { 
    this.autocompleteRef = {};
    for ( var i = 0 ; i < configuration.minNeurons; i++ ){
      this.autocompleteRef[i.toString()] = React.createRef();
    }
  }
  
  componentDidMount () {
    this.neuronFields = [...this.props.neurons];
    this.setState( { expanded : !this.props.resultsAvailable() } );
    this.circuitQuerySelected = this.props.circuitQuerySelected;
    this.setInputValue = {};
  }
  
  componentDidUpdate () {}

  /**
   * Deletes neuron field, updates control component right after
   */
  deleteNeuronField (event) {
    let id = parseInt(event.target.id);
    if ( event.target.id === "" ) {
      id = parseInt(event.target.parentElement.id);
    }
    
    // remove neuron textfield
    let neurons = this.neuronFields;
    neurons.splice(id,1);
    this?.props?.circuitQuerySelected?.splice(id, 1);
    this.props.vfbCircuitBrowser(UPDATE_CIRCUIT_QUERY, neurons);
    delete this.autocompleteRef[id.toString()];
    this.neuronFields = neurons;
    if ( !this.state.neurons.find( neuron => neuron.id != "") ) {
      // reset configuration of fq to default
      this.datasourceConfiguration.query_settings.fq = defaultDatasourceConfiguration.query_settings.fq;
    }
    
    this.forceUpdate();
  }
  
  /**
   * Add neuron textfield
   */
  addNeuron () {
    let neuronFields = this.neuronFields;
    // Add emptry string for now to text field
    neuronFields.push({ id : "", label : "" });
    // User has added the maximum number of neurons allowed in query search
    this.neuronFields = neuronFields;
    this.autocompleteRef[(neuronFields.length - 1).toString()] = React.createRef();
    this.forceUpdate();
  }
  
  /**
   * Reverse neurons textfield
   */
  reverseNeurons () {
    let neuronFields = this.neuronFields;
    [neuronFields[0], neuronFields[neuronFields.length - 1]] = [neuronFields[neuronFields.length - 1], neuronFields[0]]
    // User has added the maximum number of neurons allowed in query search
    this.neuronFields = neuronFields;
    this.autocompleteRef[(neuronFields.length - 1).toString()] = React.createRef();
    this.datasourceConfiguration.query_settings.fq = defaultDatasourceConfiguration.query_settings.fq;
    this.forceUpdate();
  }

  /**
   * Validates neurons ID's are valid, checks there's at least 8 numbers in it
   */
  fieldsValidated (neurons) {
    var pattern = /^[a-zA-Z0-9].*_[a-zA-Z0-9]{8}$/;
    for ( var i = 0 ; i < neurons.length ; i++ ){
      if ( neurons?.[i].id == "" ) {
        return false;
      } else if ( !neurons?.[i].id?.match(pattern) ) {
        return false;
      }
    }
    
    return true;
  }
  
  /**
   * Waits some time before performing new search, this to avoid performing search everytime
   * enters a new character in neuron fields
   */
  typingTimeout (target) {
    this.setInputValue = target.id;
    if ( target.id === "" ) {
      this.setInputValue = target.parentElement.id;
    }
    let neurons = this.neuronFields;

    if ( neurons[parseInt(target.id)] ) {
      neurons[parseInt(target.id)] = { id : target.value, label : target.value };
    } else {
      neurons.push({ id : target.value, label : target.value });
    }
      
    this.neuronFields = neurons;
    getResultsSOLR( target.value, this.autocompleteRef[this.setInputValue].current.handleResults,searchConfiguration.sorter,defaultDatasourceConfiguration );
  }
  
  /**
   * Neuron text field has been modified.
   */
  neuronTextfieldModified (event) {
    this.resultsHeight = event.target.offsetTop + 15;
    // Remove old typing timeout interval
    if (this.state.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    
    this.setInputValue = event.target.id;
    if ( event.target.id.id === "" ) {
      this.setInputValue = event.target.parentElement.id;
    }
    let neurons = this.neuronFields;

    if ( neurons[parseInt(event.target.id)] ) {
      neurons[parseInt(event.target.id)] = { id : event.target.value, label : event.target.value };
    } else {
      neurons.push({ id : event.target.value, label : event.target.value });
    }
    
    if ( event?.nativeEvent?.inputType === "deleteContentBackward" && neurons?.find( (neuron, index) => neuron.id === "" && index.toString() === event.target.id )){
      this.props.vfbCircuitBrowser(UPDATE_CIRCUIT_QUERY, neurons);
    } else {
      getResultsSOLR( event.target.value, this.autocompleteRef[this.setInputValue].current.handleResults,searchConfiguration.sorter,defaultDatasourceConfiguration );
    }
    this.neuronFields = neurons;
    
    if ( !this.neuronFields.find( neuron => neuron.id != "") ) {
      // reset configuration of fq to default
      this.autocompleteRef[this.setInputValue].current.clearResults();
      this.datasourceConfiguration.query_settings.fq = defaultDatasourceConfiguration.query_settings.fq;
    }
  }
  
  /**
   * Handle SOLR result selection, activated by selecting from drop down menu under textfield 
   */
  resultSelectedChanged (event, value, index) {
    // Copy neurons and add selection to correct array index
    let neurons = this.neuronFields;
    let textFieldId = event.target.id.toString().split("-")[0];
    let result = this.autocompleteRef[textFieldId].current.getFilteredResults()[value];
    let shortForm = result && result.short_form;
    neurons[index] = { id : shortForm, label : value };
    
    result.facets_annotation.forEach( annotation => {
      let facet = "facets_annotation:" + annotation;
      if ( Object.values(Neo4jLabels).includes(annotation) && !this.datasourceConfiguration.query_settings.fq.includes(facet) ) {
        this.datasourceConfiguration.query_settings.fq.push(facet); 
      }
    });

    // Keep track of query selected, and send an event to redux store that circuit has been updated
    this.circuitQuerySelected = neurons;
    this.props.vfbCircuitBrowser(UPDATE_CIRCUIT_QUERY, neurons);

    // If text fields contain valid ids, perform query
    if ( this.fieldsValidated(neurons) ) {
      this.neuronFields = neurons;
    }
  }
  
  /**
   * Paths slider has been dragged, value has changed
   */
  sliderChange (event, value ) {
    this.paths = value;
  }
  
  weightChange (event ) {
    this.weight = event.target.value;
  }

  setNeurons () {
    this.neuronFields = [{ id : "", label : "" } , { id : "", label : "" }];
    while (this?.props?.circuitQuerySelected.length > 0) {
      this?.props?.circuitQuerySelected.pop();
    }
    this.props.vfbCircuitBrowser(UPDATE_CIRCUIT_QUERY, [])
    this.setState({ key: Math.random() });
  }
  
  clearGraph () {
    this.datasourceConfiguration.query_settings.fq = defaultDatasourceConfiguration.query_settings.fq;
    this.props.clearGraph()
  }
  
  /**
   * Update neuron fields if there's a query preselected.
   */
  getUpdatedNeuronFields () {
    let neuronFields = this.neuronFields;
    // let added = false;
    // for ( var i = 0; i < this.props.circuitQuerySelected.length; i++ ){
    //   var fieldExists = this.neuronFields.find(entry =>
    //     entry.id === this.props.circuitQuerySelected[i] || entry.id === this.props.circuitQuerySelected?.[i]?.id
    //   );

    //   if ( !fieldExists ) { 
    //     const emptyIndex = neuronFields.findIndex( field => field.id === "");
    //     if ( emptyIndex >= 0 ) {
    //       neuronFields[emptyIndex] = { id : this.props.circuitQuerySelected[i].id ? this.props.circuitQuerySelected[i].id : this.props.circuitQuerySelected[i], label : this.props.circuitQuerySelected[i].label ? this.props.circuitQuerySelected[i].label : this.props.circuitQuerySelected[i] };
    //       added = true;
    //       fieldExists = true;
    //       break;
    //     } else {
    //       neuronFields.pop();
    //       neuronFields.push({ id : this.props.circuitQuerySelected[i].id ? this.props.circuitQuerySelected[i].id : this.props.circuitQuerySelected[i], label : this.props.circuitQuerySelected[i].label ? this.props.circuitQuerySelected[i].label : this.props.circuitQuerySelected[i] })
    //     }
        
    //     if ( this.props.circuitQuerySelected.length > neuronFields.length && !fieldExists && this.props.circuitQuerySelected?.[i]?.id != "") {
    //       if ( this.props.circuitQuerySelected !== "" ) {
    //         neuronFields.push({ id : this.props.circuitQuerySelected[i].id ? this.props.circuitQuerySelected[i].id : this.props.circuitQuerySelected[i], label : this.props.circuitQuerySelected[i].label ? this.props.circuitQuerySelected[i].label : this.props.circuitQuerySelected[i] });
    //       } 
    //     }
    //   }
    // }
    
    return neuronFields;
  }
  
  render () {
    let self = this;
    const { classes } = this.props;
    this.circuitQuerySelected = this.props.circuitQuerySelected;
    let neuronFields = this.getUpdatedNeuronFields();
    
    let expanded = this.state.expanded;
    if ( this.props.resultsAvailable() ){
      expanded = true;
    }
    
    // Show delete icon on neuron text fields only if there's more than the minimum allowed
    let deleteIconVisible = neuronFields.length > configuration.minNeurons;
    // The grid item size with the neuron textfield will depend on whether or not delete icon is visible
    let neuronColumnSize = deleteIconVisible ? 11 : 12 ;
    // Only show Add Neuron button if the maximum hasn't been reached
    let addNeuronDisabled = neuronFields.length >= configuration.maxNeurons;
    
    return (
      <ThemeProvider theme={theme}>
        <div>
          <div style={{ position: "absolute", width: "5vh", height: "100%", zIndex: "100", marginTop: "0.5rem" }}>
            <div style={{ zIndex : "1000" , cursor : "pointer", backgroundImage: `url(${styling.controlIcons.home})`, width: "1.25rem", height: "1.25rem" }} onClick={self.props.resetCamera }></div>
            <div style={{ zIndex : "1000" , cursor : "pointer", marginTop: "1rem", backgroundImage: `url(${styling.controlIcons.zoomIn})`, width: "1.25rem", height: "1.25rem" }} onClick={self.props.zoomIn }></div>
            <div style={{ zIndex : "1000" , cursor : "pointer", marginTop : "5px", backgroundImage: `url(${styling.controlIcons.zoomOut})`, width: "1.25rem", height: "1.25rem" }} onClick={self.props.clear }></div>
          </div>
          { this.props.resultsAvailable()
            ? <ul className={classes.legend} id="circuitBrowserLegend">
                <p style={{ fontWeight: 500, margin: 0, marginBottom: "0.5rem" }}>Legend</p>
              { this.props.legend.map((label, index) => (
                <li key={index} style={{ display: "flex", alignItems: "center", color: "rgba(255, 255, 255, 0.80)", marginTop: "0.25rem" }}>
                  <div className={classes.legendItem} style={{ backgroundColor : styling.nodeColorsByLabel[label], border: "1px solid rgba(0, 0, 0, 0.20)" }}></div>
                  {label}
                </li>
              ))
              }
              <hr style={{ border: "1px solid #505050" }}/>
              <li key="weight" style={{color: "rgba(255, 255, 255, 0.80)", fontSize: "0.75rem" }}>WEIGHT -forward [Reverse] →</li>
            </ul>
            : null
          }
          <Accordion key={this.state.key} className={classes.root} defaultExpanded={expanded} >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon fontSize="small" />}
              onClick={() => self.setState({ expanded : !expanded })}
              classes={{ expanded: classes.expanded }}
              IconButtonProps={{ style: { padding : 0, margin : 0 } }}
            >
              <div className={classes.column}>
                <Typography variant="body2">Connectivity query</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails classes={{ root : classes.details }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <img src={ADJUST_ICON} alt='' style={{width: "0.75rem", height: "0.75rem"}}/>
                    <MoreVertIcon classes={{ root : classes.dottedIcon }} fontSize="small"/>
                    <img src={LOCATION_ICON} alt='' style={{width: "0.75rem", height: "0.75rem"}}/>
                  </div>
                </Grid>
                <Grid item id="neuronFieldsGrid" sm={9}>
                  { neuronFields.map((field, index) => (
                    <Grid container alignItems="center" justifyContent="center" key={"TextFieldContainer" + index}>
                      <Grid item sm={neuronColumnSize} key={"TextFieldItem" + index}>
                        <AutocompleteResults
                          field={field}
                          index={index}
                          neuronTextfieldModified={this.neuronTextfieldModified}
                          getLatestNeuronFields={this.getUpdatedNeuronFields}
                          resultSelectedChanged={(event, value) => this.resultSelectedChanged(event, value, index)}
                          ref={this.autocompleteRef[index.toString()]}
                        />
                      </Grid>
                      { deleteIconVisible ? <Grid item sm={1}>
                        <IconButton
                          key={"TextFieldIcon-" + index}
                          onClick={self.deleteNeuronField}
                          fontSize="small"
                          id={"deleteNeuron" + ( index ).toString()}
                          classes = {{ root : classes.deleteNeuron }}>
                          <DeleteIcon id={index.toString()}/>
                        </IconButton>
                      </Grid>
                        : null
                      }
                    </Grid>
                  ))}
                </Grid>
                <Grid item justifyContent="space-between" alignItems="center" sm={1}>
                  <IconButton
                    id="reverseNeurons"
                    color="inherit"
                    size="medium"
                    className={classes.reverseNeurons}
                    onClick={this.reverseNeurons}
                    style={ { paddingLeft : "1vh" } }
                  >
                    <SwapVertIcon fontSize="small" />
                  </IconButton>
                </Grid>
                { addNeuronDisabled 
                  ? null
                  : <Grid container style={ { marginTop : "1vh" } } justifyContent="space-between" alignItems="center">
                    <Grid item sm={2} classes={{ root : classes.addNeuron }}>
                      <IconButton
                        id="addNeuron"
                        color="inherit"
                        size="small"
                        onClick={this.addNeuron}
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Grid>
                    <Grid item sm={10} classes={{ root : classes.addNeuron }}>
                      <Typography classes={{ root : classes.typography }}>Add Neuron</Typography>
                    </Grid>
                  </Grid>
                }
              </Grid>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid container alignItems="center">
                  <Grid item sm={4}>
                    <Typography classes={{ root : classes.typography }}># Paths</Typography>
                  </Grid>
                  <Grid item sm={8}>
                    <Slider
                      aria-labelledby="discrete-slider-always"
                      defaultValue={this.paths}
                      onChangeCommitted={this.sliderChange}
                      step={1}
                      marks={customMarks()}
                      valueLabelDisplay="auto"
                      min={configuration.minPaths}
                      max={configuration.maxPaths}
                      classes={{ root : classes.slider }}
                    />  
                  </Grid>
                </Grid>
                <Grid container alignItems="center" style={{marginTop: "0.75rem"}}>
                  <Grid item sm={4}>
                    <Typography classes={{ root : classes.typography }}>Min Weight</Typography>
                  </Grid>
                  <Grid item sm={8}>
                    <Input className={classes.weightInputDiv} label="Graph weight" defaultValue={this.weight} onChange={this.weightChange} inputProps={{ 'aria-label': 'description', id : "weightField", className : classes.weightInput }} />
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="space-between" width={1} mt={1.5}>
                  <Button
                    variant="contained"
                    color="secondary"
                    classes={{ root : classes.clearButton }}
                    id="clearCircuitBrowser"
                    onClick={this.clearGraph.bind(this)}>
                      Clear
                  </Button> 
                  <Button
                    variant="contained"
                    color="primary"
                    classes={{ root : classes.refreshButton }}
                    id="refreshCircuitBrowser"
                    onClick={() => this.props.updateGraph(this.neuronFields, this.paths, this.weight)}>
                      Run Query
                  </Button> 
                </Box>
              </Grid>
            </AccordionActions>
          </Accordion>
        </div>
      </ThemeProvider>
    )
  }
}

Controls.propTypes = { classes: PropTypes.object.isRequired };

function mapStateToProps (state) {
  return { ...state }
}

function mapDispatchToProps (dispatch) {
  return { vfbCircuitBrowser: (type, neurons) => dispatch ( { type : type, data : { instance : neurons } }), }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef : true } )(withStyles(styles)(Controls));
