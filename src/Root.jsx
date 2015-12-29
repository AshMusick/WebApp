import React, { Component }             from 'react';
import { Router, Route, IndexRoute }    from 'react-router';

import VoterStore                       from 'stores/VoterStore';
import BallotStore                      from 'stores/BallotStore';

// main Application
import Application  		            from 'Application';

/****************************** ROUTE-COMPONENTS ******************************/
/* Intro */
import Intro                            from 'routes/Intro/Intro';
import IntroContests                    from 'routes/Intro/IntroContests';
import IntroOpinions                    from 'routes/Intro/IntroOpinions';

/* settings */
import SettingsDashboard                from 'routes/Settings/SettingsDashboard';
import Settings                         from 'routes/Settings/Settings';
import Location                         from 'routes/Settings/Location';

/* myballot */
import Ballot			                from 'routes/Ballot/Ballot';
import Candidate                        from 'routes/Ballot/Candidate';
// import Measure                          from 'routes/Ballot/Measure';
// import Opinion                          from 'routes/Ballot/Opinion';

import Requests                         from 'routes/Requests';
import Connect                          from 'routes/Connect';
import Activity                         from 'routes/Activity';

import More                             from 'routes/More';
import About                            from 'routes/More/About';

import NotFound                         from 'routes/NotFound';

import AddFriend                        from 'routes/AddFriend';


new Promise( function (resolve) { resolve('Oakland, CA') })
    .then(VoterStore.initialize.bind(VoterStore))
    .then(BallotStore.initialize.bind(BallotStore))
    .catch(err => console.error(err));

class Root extends Component {
    static propTypes = {
        history: React.PropTypes.object.isRequired
    };

    render() {
        const { history } = this.props;

        return (
            <Router history={history} >
                {/*
                  * This is the intro section of the application.
                  * First time visitors should be directed here.
                  */ }
                <Route path="/intro" >
                    <IndexRoute component={Intro} />
                    <Route path="opinions" component={IntroOpinions} />
                    <Route path="contests" component={IntroContests} />
                </Route>

                {/* Settings go in this structure... */}
                <Route path="/settings" component={SettingsDashboard}>
                    <IndexRoute component={Settings} />
                    <Route path="location" component={Location} />
                </Route>

                <Route path="/friends" >
                    <Route path="add" component={AddFriend} />
                    <Route path="remove" />
                </Route>

                <Route path="/about" component={About} />

                <Route path="/" component={Application} >
                    <IndexRoute component={Ballot} />
                    <Route path="ballot" component={Ballot} />
                    <Route path="candidate/:id" component={Candidate} />
                    {/*
                        <Route path="org/:id" component={Organization}/>
                        <Route path="measure/:id" component={Measure} />
                        <Route path="org/:id" component={Organization}/>
                        <Route path="opinion" component={Opinion} />
                        <Route path="/office/:id" component={Office} />

                    */}

                    <Route path="requests" component={Requests} />
                    <Route path="connect" component={Connect} />

                    <Route path="activity" component={Activity} />
                    <Route path="more" component={More} />

                    // Any route that is not found -> @return NotFound component
                    <Route path="*" component={NotFound} />
                </Route>
            </Router>
        );
    }
};

export default Root;