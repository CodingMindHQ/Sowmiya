import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as contentful from 'contentful'

import Course from '../components/Course'

const SPACE_ID = '5k6it0v9jxti'
const ACCESS_TOKEN = 'JViEl3BlMc3sFVeiRsENS-EUK1BKt4ST_dVulDLm9Vg'
const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
})
class CourseList extends Component{
    state = {
        courses: [],
        searchString: ''
    }
    constructor() {
        super()
        this.getCourses()
    }
    getCourses = () => {
        client.getEntries({
            content_type: 'course',
            query: this.state.searchString
        })
        .then((response) => {
            this.setState({courses: response.items})
            console.log(this.state.courses)
        })
        .catch((error) => {
          console.log("Error occurred while fetching Entries")
          console.error(error)
        })
    }

    onSearchInput =(event)=>{
        if(event.target.value){
            this.setState({searchstring: event.target.value})

        }else{
            this.setState({searchString: ''})
    
        }
        this.getCourses()
    }
    render(){
        return(
            <div>
                {this.state.courses ? (
                    <div>
                        <TextField style={{padding: 24}}
                        id="searchInput"
                        placeholder="Search for Courses"
                        margin="normal"
                        onChange={this.onsearchInputChange}/>
                        <Grid container spacing ={24} style={{padding: 24}} direction="row" spacing={3}>
                        {this.state.courses.map(currentCourse=> (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Course course={currentCourse}/>
                                </Grid>
                                ))}
                        </Grid>
                  </div>
                ): "No courses found" }
                <center><p>@<a href ="https://www.codecademy.com/learn/" target=" blank">Free Online tutorials</a> | <a href="https://www.facebook.com/codecademy/" target =" blank">facebook</a> | <a href ="https://www.youtube.com/channel/UC5CMtpogD_P3mOoeiDHD5eQ" target=" blank">youtube</a></p></center>
            </div>
         )
       }
    }
    export default CourseList;