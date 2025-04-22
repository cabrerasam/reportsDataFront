/* eslint-disable react/jsx-no-comment-textnodes */
import { Route, Routes } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import CreateIndividual from './pages/subjectsForms/individuals/CreateIndividual'
import CreateCollective from './pages/subjectsForms/collectives/CreateCollective'
import Diary from './pages/reportForms/diary/Diary'
import Sunday from './pages/reportForms/sunday/Sunday'
import Monitoring from './pages/reportForms/monitoring/Monitoring'
import Weekly from './pages/reportForms/weekly/Weekly'
import NgoWeekly from './pages/reportForms/ngoweekly/NgoWeekly'
import Alert from './pages/reportForms/alert/Alert'
import IndividualView from './pages/subjectsForms/individuals/IndividualView'
import Individual from './pages/subjectsForms/individuals/Individual'
import CollectiveView from './pages/subjectsForms/collectives/CollectiveView'
import Collective from './pages/subjectsForms/collectives/Collective'
import ViewDiaries from './pages/reportForms/diary/ViewDiaries'
import ViewMonitoring from './pages/reportForms/monitoring/ViewMonitoring'
import ViewSundays from './pages/reportForms/sunday/ViewSundays'
import ViewAlert from './pages/reportForms/alert/ViewAlert'
import ViewWeekly from './pages/reportForms/weekly/ViewWeekly'
import ViewNgoWeekly from './pages/reportForms/ngoweekly/ViewNgoWeekly'
import Login from './pages/login/Login'
import Speachs from './pages/subjectsForms/speachs/Speachs'
import ViewSpeachs from './pages/subjectsForms/speachs/ViewSpeachs'
import CreateUser from './pages/userForms/CreateUser'
import Issues from './pages/reportForms/issues/Issues'
import SingleMonitoring from './pages/reportForms/monitoring/SingleMonitoring'
import SingleWeekly from './pages/reportForms/weekly/SingleWeekly'
import SingleNgoWeekly from './pages/reportForms/ngoweekly/SingleNgoWeekly'
import SingleDiary from './pages/reportForms/diary/SingleDiary'
import SingleAlert from './pages/reportForms/alert/SingleAlert'
import SingleSunday from './pages/reportForms/sunday/SingleSunday'
import Associations from './pages/subjectsForms/associations/Associations'
import ViewAssociations from './pages/subjectsForms/associations/ViewAssociations'
import SingleAssociation from './pages/subjectsForms/associations/SingleAssociation'
import AssociationJoin from './pages/subjectsForms/associations/AssociationJoin'
import UpdateIndividual from './pages/subjectsForms/individuals/UpdateIndividual'
import UpdateCollective from './pages/subjectsForms/collectives/UpdateCollective'

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        //User
        <Route path='/user' element={<CreateUser />} />
        //Individuals
        <Route path='/individual' element={<CreateIndividual />} />
        <Route path='/individual/:id' element={<UpdateIndividual />} />
        <Route path='/individualList' element={<IndividualView />} />
        <Route path='/individuals/:id' element={<Individual />} />
        //Speaches
        <Route path='/speach' element={<Speachs />} />
        <Route path='/speachList' element={<ViewSpeachs />} />
        //Associations
        <Route path='/association' element={<Associations />} />
        <Route path='/associationList' element={<ViewAssociations />} />
        <Route path='/associationList/:id' element={<SingleAssociation />} />
        <Route path='/association/join' element={<AssociationJoin />} />
        //Collectives
        <Route path='/collective' element={<CreateCollective />} />
        <Route path='/collective/:id' element={<UpdateCollective />} />
        <Route path='/collectiveList' element={<CollectiveView />} />
        <Route path='/collectives/:id' element={<Collective />} />
        //Reports
        //Issues
        <Route path='/issues' element={<Issues />} />
        //Diary
        <Route path='/diary' element={<Diary />} />
        <Route path='/diaryList' element={<ViewDiaries />} />
        <Route path='/diaryList/:id' element={<SingleDiary />} />
        //Sunday
        <Route path='/sunday' element={<Sunday />} />
        <Route path='/sundaysList' element={<ViewSundays />} />
        <Route path='/sundaysList' element={<ViewSundays />} />
        <Route path='/sundaysList/:id' element={<SingleSunday />} />
        //Alert
        <Route path='/alert' element={<Alert />} />
        <Route path='/alertList' element={<ViewAlert />} />
        <Route path='/alertList/:id' element={<SingleAlert />} />
        //Monitoring
        <Route path='/monitoring' element={<Monitoring />} />
        <Route path='/monitoringList' element={<ViewMonitoring />} />
        <Route path='/monitoringList/:id' element={<SingleMonitoring />} />
        //Weekly
        <Route path='/weekly' element={<Weekly />} />
        <Route path='/weeklyList' element={<ViewWeekly />} />
        <Route path='/weeklyList/:id' element={<SingleWeekly />} />
        //NgoWeekly
        <Route path='/ngoweekly' element={<NgoWeekly />} />
        <Route path='/ngoweeklyList' element={<ViewNgoWeekly />} />
        <Route path='/ngoweeklyList/:id' element={<SingleNgoWeekly />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default Routing
