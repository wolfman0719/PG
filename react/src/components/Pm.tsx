import { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";

import configinfo from '../serverconfig.json';

const serverAddress = configinfo.ServerAddress;
const serverPort = configinfo.ServerPort;
const username = configinfo.Username;
const password = configinfo.Password;
const applicationName = configinfo.ApplicationName;

export const Pm = (props: any) => {

  const [weekList, setWeekList] = useState<any>([]);
  const [projectList, setProjectList] = useState<any>([]);
  const [phaseList, setPhaseList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [memberName, setMemberName] = useState<any>("");
  const [memberId, setMemberId] = useState<any>("");
  const [projectId, setProjectId] = useState<any>(1);
  const [phaseId, setPhaseId] = useState<any>(1);
  const [workingHours, setWorkingHours] = useState<any>(1);
  const [week, setWeek] = useState<any>("");

  const onChangeMemberId = (e: ChangeEvent<HTMLInputElement>) => {
      setMemberId(e.target.value);
	  setIsLoading(true);
      setIsError(false);

	  axios
	    .get<any>(`http://${serverAddress}:${serverPort}${applicationName}/member/${e.target.value}?IRISUsername=${username}&IRISPassword=${password}`)
	    .then((result: any) => setMemberName(result.data.Name))
        .catch((error: any) => {
          setIsError(true)
		   if (error.response) {			
		     setErrorText(error.response.data.summary);
		   }
		   else if (error.request) {
		     setErrorText(error.request);
		   } 
		   else {
		     setErrorText(error.message);
		   }
	    })
        .finally(() =>  setIsLoading(false));
}  

  const onClickProject = (e: any) => setProjectId(e.target.value);  
  const onChangeWH = (e: ChangeEvent<HTMLInputElement>) => setWorkingHours(e.target.value);  
  const onClickPhase = (e: any) => setPhaseId(e.target.value);  
  const onClickWeeks = (e:  any) => setWeek(e.target.value);  
  
   const clearActivity = () => {
     setProjectId(1);
     setPhaseId(1);
     setMemberId("");
     setMemberName("");
     setWeek(weekList[0].week);
     setWorkingHours(1);
  };
    
   const newActivity = (e: any) => {

	setIsLoading(true);
	setIsError(false);
	
     const senddata: any =  {};
	  senddata.week = week;
	  senddata.workhours = workingHours;
	  senddata.projectindex = projectId;
	  senddata.phaseindex = phaseId;
	  senddata.memberid = memberId;

	  axios
	    .post<any>(`http://${serverAddress}:${serverPort}${applicationName}/createactivityrecord?IRISUsername=${username}&IRISPassword=${password}`,senddata)
	   .then((result: any) => {
	       setIsError(false)
	       alert('saved!!');})
        .catch((error: any) => {
	       setIsError(true)
		 if (error.response) {			
		   setErrorText(error.response.data.summary);
		 }
		 else if (error.request) {
		   setErrorText(error.request);
		 } 
		 else {
		   setErrorText(error.message);
		 }
	    })
        .finally(() => setIsLoading(false))
};

useEffect( () => {

	setIsLoading(true);
    setIsError(false);
  
	axios
	  .get<any>(`http://${serverAddress}:${serverPort}${applicationName}/getprojects?IRISUsername=${username}&IRISPassword=${password}`)
	  .then((result: any) => {
	  const projects = result.data.map((project: any) => ({
		id: project.id,
		name: project.name
      }));
      setProjectList(projects);
	  })
      .catch((error: any) => {
        setIsError(true)
        console.log('error = %o' ,error);
		setErrorText(error.response.data.summary);
	  })

	axios
	  .get<any>(`http://${serverAddress}:${serverPort}${applicationName}/getphases?IRISUsername=${username}&IRISPassword=${password}`)
	  .then((result: any) => {
	   console.dir(result.data);
	  const phases = result.data.map((phase: any) => ({
		id: phase.id,
		name: phase.name
      }));
      setPhaseList(phases);
	  })
      .catch((error: any) => {
        setIsError(true)
        console.log('error = %o' ,error);
		setErrorText(error.response.data.summary);
	  })

	axios
	  .get<any>(`http://${serverAddress}:${serverPort}${applicationName}/getyearweeks/4?IRISUsername=${username}&IRISPassword=${password}`)
	  .then((result: any) => {
	   console.dir(result.data);
	  const weeks = result.data.map((week: any) => ({
		week: week.week
      }));
      setWeekList(weeks);
	  })
      .catch((error: any) => {
        setIsError(true)
        console.log('error = %o' ,error);
		setErrorText(error.response.data.summary);
	  })
	  // eslint-disable-next-line react-hooks/exhaustive-deps
      .finally(() => setIsLoading(false));
      
      
      }, []);
      
  return (
    <>
      <form>
      <table>
      <tbody>
      <tr><td /><td><label className="h3">アクティビティ入力</label></td><td /></tr>
	  <tr>
	  <td><label className="p-2">メンバーID: </label></td>
	  <td><input type="text" value = {memberId} onChange={onChangeMemberId} style = {{float: "left"}} /></td><td></td>
	  </tr>
     <tr>
	 <td><label className="p-2">メンバー名: </label></td>
	 <td><input type="text"  name="membername" value={memberName}  style = {{float: "left"}} /></td><td />
	  </tr>
	 <tr>
	  <td><label className="p-2">プロジェクト名: </label></td>
      <td><select size={5} name="projectList" value={projectId} onClick={onClickProject} style = {{float: "left"}}>
      { projectList.map((project: any) => (
       <option value={project.id} key={project.id}>{project.name} </option>
      ))}
      </select>
      </td><td />
      </tr>
	  <tr>
	  <td><label className="p-2">フェーズ: </label></td>
      <td><select size={5} name="phaseLst" value={phaseId} onClick={onClickPhase} style = {{float: "left"}}>
      { phaseList.map((phase: any) => (
       <option value={phase.id} key={phase.id}>{phase.name} </option>
      ))}
      </select>
      </td><td />
      </tr>
      <tr>
	  <td><label className="p-2">作業時間: </label></td>
	  <td><input type="text"  name="workinghours" value={workingHours}  onChange={onChangeWH} style = {{float: "left"}} /></td><td />
	  </tr>
	  <tr>
	  <td><label className="p-2">作業期間（週単位）: </label></td>
      <td><select size={4} name="weekLst" value={week} onClick={onClickWeeks} style = {{float: "left"}}>
      {weekList.map((week: any) => (
       <option value={week.week} key={week.week}>{week.week} </option>
      ))}
      </select>
      </td><td />
      </tr>
	  <tr>
	  <td />
	  <td><button type="button" value="save" onClick={newActivity}  style = {{float: "left"}} >保存</button>
	  <button type="button" value="clear" onClick={clearActivity}  style = {{float: "left"}} >クリア</button>
	  </td><td />
	  </tr>
	 </tbody></table>
      </form>
	  {isError && <p style={{ color: "red" }}>エラーが発生しました　{`${errorText}`}</p>}
    </>	
  );	
}
export default Pm;
