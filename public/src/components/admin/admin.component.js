import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import '../../assets/styles/admin.style.scss';

export default class AdminComponent extends Component {
	constructor(props) {
		super(props);
		this.movies = {};
		this.halls = [];
		this.cashiers = [];
		this.state = {
			edit: {
				id: '',
				isEdit: false
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if (Object.keys(nextProps.movies).length) this.movies = {...nextProps.movies};
		if (nextProps.halls.length) this.halls = [...nextProps.halls];
		if (nextProps.cashier.length) this.cashiers = [...nextProps.cashier];
	}

	render() {
		return (
			<div className="admin_wrapper">
				<h2>{this.props.admin ? `Administrator is ${this.props.admin}` : ''}</h2>
				<table>
					<thead>
						<tr>
							<th>Halls</th>
							<th>Movies</th>
							<th>Cashiers</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<NavLink className="form_submit_btn create_button" to="/admin/create">Create Hall</NavLink>
								<form onSubmit={this.props.createHall.bind(this)}>
									<div className="form_item_group">
										<div><label htmlFor="hall">Create Hall</label></div>
										<input ref={input => this.hallName = input} type="text" id="hall" name="hall" placeholder="Hall" />
									</div>
									<div className="form_item_group">
										<button className="form_submit_btn">Create Hall</button>
									</div>
								</form>
							</td>
							<td>
								<NavLink className="form_submit_btn create_button" to="/admin/create/movie">Create Movie</NavLink>
								<form onSubmit={this.props.createMovie.bind(this)}>
									<div className="form_item_group">
										<div><label>Choose Hall</label></div>
										<select ref={input => this.hall = input}>
											{
												this.halls.map(hall => {
													return hall._id ? <option key={hall._id}>
														{hall.name}
													</option> : null
												})
											}
										</select>
									</div>
									<div className="form_item_group">
										<div><label htmlFor="movie">Create Movie</label></div>
										<input ref={input => this.movie = input} type="text" id="movie" name="movie" placeholder="Movie" />
									</div>
									<div className="form_item_group">									
										<div className="form_item_group">
											<div><label htmlFor="startTime">Start Time</label></div>
											<input ref={input => this.startTime = input} type="text" id="startTime" name="startTime" placeholder="Start Time" />
										</div>
										<div className="form_item_group">
											<div><label htmlFor="day">Day</label></div>
											<input ref={input => this.day = input} type="text" id="day" name="day" placeholder="Day" />
										</div>
										<div className="form_item_group">
											<div className="duration_blog">
												<div><label htmlFor="durationHour">Duration Hour</label></div>
												<input ref={input => this.durationHour = input} type="text" id="durationHour" name="durationHour" placeholder="Duration Hour" />
											</div>
											<div className="duration_blog">
												<div><label htmlFor="durationSecond">Duration Minutes</label></div>
												<input ref={input => this.durationSecond = input} type="text" id="durationSecond" name="durationSecond" placeholder="Duration Second" />
											</div>
										</div>
										<div className="form_item_group">
											<div><label htmlFor="price">Price</label></div>
											<input ref={input => this.price = input} type="text" id="price" name="price" placeholder="Price" />
										</div>									
									</div>
									<div className="form_item_group">
										<button className="form_submit_btn">Create Movie</button>
									</div>
								</form>
							</td>
							<td>
								<NavLink className="form_submit_btn create_button" to="/admin/create/cashier">Create Cashier</NavLink>								
								<form onSubmit={this.props.createCashier.bind(this)}>
									<div className="form_item_group">
										<div>
											<label htmlFor="name">Name</label>
										</div>
										<input ref={input => this._name = input} type="text" id="name" name="name" placeholder="Name" />
									</div>
									<div className="form_item_group">
										<div>
											<label htmlFor="username">Username</label>
										</div>
										<input ref={input => this.username = input} type="text" id="username" name="username" placeholder="Username" />
									</div>
									<div className="form_item_group">
										<div>
											<label htmlFor="password">Password</label>
										</div>
										<input ref={input => this.password = input} type="password" id="password" name="password" placeholder="Password" />
									</div>
									<div className="form_item_group">
										<button className="form_submit_btn">Create Cashier</button>
									</div>
								</form>
							</td>
						</tr>
					</tbody>
				</table>
				<table className="admin_table">
					<thead>
						<tr>
							<th className="admin_table_hall">
								Hall
								<div className="filter_wrapper">
									<select onChange={this.props.filterHalls.bind(this)}>
										{											
											this.halls.map(hall => {
												return hall.name ? <option key={hall._id} value={hall._id}>
													{hall.name}
												</option> : <option key="0" value="">All</option>
											})
										}
									</select>
								</div>
							</th>
							<th className="admin_table_movie">Movie</th>
							<th onClick={this.props.sortData.bind(this, 'startTime')} className="filter_th">StartTime</th>
							<th onClick={this.props.sortData.bind(this, 'day')} className="filter_th admin_table_day">
								Day
								<div className="filter_wrapper">
									<select onChange={this.props.filterDays.bind(this)}>
										{
											this.movies.days && this.movies.days.length ? 
												this.movies.days.map((day, index) => {
													return day ? <option key={index} value={moment(day).format('MMM Do YY')}>
														{moment(day).format('MMM Do YY')}
													</option> : <option key="0" value="">All</option>
												})
											: null
										}
									</select>
								</div>
							</th>
							<th onClick={this.props.sortData.bind(this, 'duration')} className="filter_th">Duration</th>
							<th onClick={this.props.sortData.bind(this, 'price')} className="filter_th">Price</th>
							<th className="edit_th">Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{
							this.movies.data && this.movies.data.length ? 
								this.movies.data.map(movie => {
									return <tr key={movie._id}>
										<td>
											{
												this.state.edit.id === movie._id ?
													<select onChange={(select) => movie.hall._id = select.target.value}>
														{
															this.halls.map(hall => {
																return hall.name ? <option key={hall._id} value={hall._id} selected={movie.hall._id == hall._id ? 'selected' : ''}>
																	{hall.name}
																</option> : <option key="0" defaultValue="">All</option>
															})
														}
													</select>
												:
													movie.hall && movie.hall.name ? movie.hall.name : ''
											}
										</td>
										<td>
											{
												this.state.edit.id === movie._id ?
													<input type="text" name="movieName" defaultValue={movie.name || ''} onChange={(input) => movie.name = input.target.value} />
												: 
													movie.name ? movie.name : ''

											}
										</td>
										<td>
											{
												this.state.edit.id === movie._id ?
													<input type="text" name="movieStartTime" defaultValue={movie.startTime || ''} onChange={(input) => movie.startTime = input.target.value} />
												: 
													movie.startTime ? movie.startTime : ''

											}
										</td>
										<td>
											{
												this.state.edit.id === movie._id ?
													<input type="text" name="movieDay" defaultValue={moment(movie.day).format('l') || ''} onChange={(input) => movie.day = input.target.value} />
												: 
													movie.day ? moment(movie.day).format('MMM Do YY') : ''

											}
										</td>
										<td>
											{
												this.state.edit.id === movie._id ?
													<input type="text" name="movieDuration" defaultValue={movie.duration || ''} onChange={(input) => movie.duration = input.target.value} />
												: 
													movie.duration || ''

											}
										</td>
										<td>{
												this.state.edit.id === movie._id ?
													<input type="text" name="moviePrice" defaultValue={movie.price || ''} onChange={(input) => movie.price = input.target.value} />
												: 
													movie.price || ''
											}
										</td>
										<td>
											{
												this.state.edit.id === movie._id ?
													<button style={{background: '#968543'}} className="form_submit_btn form_submit_edit" onClick={this.props.updateMovie.bind(this, movie) }>
														Update
													</button>
												:
													<button className="form_submit_btn form_submit_edit" onClick={this.props.editMovie.bind(this, movie)}>
														Edit
													</button>
											}
										</td>
										<td>
											<button className="form_submit_btn form_submit_delete" onClick={this.props.deleteMovie.bind(this, movie._id)}>
												Delete
											</button>
										</td>
									</tr>									
								})
							: null
						}
					</tbody>
				</table>
			</div>
		)
	}
}