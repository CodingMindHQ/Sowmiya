import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as contentful from 'contentful'
import Course from '../components/Course'

const SPACE_ID = ''
const ACCESS_TOKEN = ''
const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
})
class CoursesList extends Component
 {
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
                {this.state.course?(
                    <div>
                        <TextField style={{padding: 24}}
                        id="searchIntput"
                        placeholder="Search for Courses"
                        margin="normal"
                        onChange={this.onsearchInputChange}/>
                        <Grid cointainer spacing ={24} style={{padding: 24}}
                        </Grid>

                )}
            </div>
        )
    }