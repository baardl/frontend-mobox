import React, {Component} from "react"
import {inject, observer} from "mobx-react"
import PropTypes from "prop-types"
import {action, decorate} from "mobx"
import ProcessListRow from "./ProcessListRow";

class ShareprocProcesses extends Component {
	componentDidMount() {
		console.log("Search for processes");
		this.props.shareproc.searchForProcesses("baardl")
	}

	handleSelect = e => {
		const selected = e.target.value
		this.props.test.setSelected(selected)
	}

	render() {
		return <div>

			<h3>Shareproc processes</h3>
			Loading: {this.props.shareproc.fetchingProcesses}<br/>
			Processes:
            <ul className="ProcessesList">
                {this.props.shareproc.processes.map((process, i) =>
                    <ProcessListRow key={i} process={process}/>
                )}
            </ul>
			</div>
	}
}

ShareprocProcesses.propTypes = {
	shareproc:  PropTypes.object.isRequired
}

decorate(ShareprocProcesses, {
	addEntry:    action.bound,
	removeEntry: action.bound
})

export default inject('shareproc')(observer(ShareprocProcesses))

