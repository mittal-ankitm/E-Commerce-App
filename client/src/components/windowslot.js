import React,{useState,useEffect,useContext} from 'react'
import {usercontext} from '../App'
import {serverurl} from '../config'
import {Link,useHistory} from 'react-router-dom'
import DatePicker from 'react-date-picker'

const WindowSlot= ()=>{

   const [data,setdata]=useState([])
   const {state,dispatch}=useContext(usercontext)
   const [date,setdate]=useState()
   const [dateshow,setdateshow]=useState()
   const [time,settime]=useState("")
   const history=useHistory()


const getmindate=()=>{
   let dt=new Date();
   dt.setDate(dt.getDate()+2);
   return dt;
}

const getdate=()=>{
   fetch(`${serverurl}/timeslot/getwindowslotuser`,{
      method:"post",
      headers:{
         "Content-Type":"application/json",
         "Authorization":"Bearer "+localStorage.getItem("token")
      },
      body:JSON.stringify({
         date:date.toDateString()
      })
   }).then(res=>res.json())
   .then(result=>{
       setdata(result.timeslot)
       setdateshow(date)
       console.log(result)
   }).catch(err=>{
      console.log(err)
   })
} 

const submitorder=()=>{
   if(!time) return 0;
   fetch(`${serverurl}/windoworders/placeorder`,{
      method:"post",
      headers:{
         "Content-Type":"application/json",
         "Authorization":"Bearer "+localStorage.getItem("token")
      },
      body:JSON.stringify({
         timeslotid:time
      })
   }).then(res=>res.json())
   .then(result=>{
       console.log(result)
       history.push(`/windowfinal/${result.id}`)
   }).catch(err=>{
      console.log(err)
   })
}

const convert=(i)=>{
   var c=""
   if(i<12) c="AM"
   else{c="PM";if(i>12) i=i-12;}
   if(i==0.5) return "12.30-1.00 PM"
if(i*10%10==0){
   return Math.floor(i)+".00-"+(Math.floor(i))+".30"+c
}else{
   return Math.floor(i)+".30-"+(Math.floor(i)+1)+".00"+c
}
}

return(

   <div className='main'>
       <div className='rout'>select time slot</div>
  <DatePicker value={date} minDate={getmindate()} onChange={(dt)=>setdate(dt)} />
       <button className='d' onClick={()=>getdate()}>check</button>
<div className='sel'>{dateshow?dateshow.toDateString():""}</div>
       <select className='sel' onChange={(e)=>settime(e.target.value)}>
          {
             data?
             data.map(item=>{
                return(
                <option value={item._id}>{convert(item.start)}</option>
                )
             })
             :<option></option>
          }
       </select>
      <button onClick={()=>submitorder()}>book slot</button>
   </div>

)

}

export default WindowSlot