import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useContext} from "react";
import { Context } from './../../context/Context';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import * as Yup from "yup";
import { useFormik } from "formik";

export default function Add_StudentsQuestionary( ) {
	
	const [validated, setValidated] = useState(false);
	const { setMessages, token } = useContext(Context);
	//Data
	const [opinion_generic, setOpinion_generic] = useState('');
	const [opinion_notchallenge, setOpinion_notchallenge] = useState('');
	const [opinion_challenge, setOpinion_challenge] = useState('');
	const [mother_educ_lavel, setMother_educ_lavel] = useState('');
	const [father_educ_lavel, setFather_educ_lavel] = useState('');
	const [mother_motivation, setMother_motivation] = useState('');
	const [father_motivation, setFather_motivation] = useState('');
	const [eco_aid_mother, setEco_aid_mother] = useState('');
	const [eco_aid_father, setEco_aid_father] = useState('');
	const [student_inspiration, setStudent_inspiration] = useState('');
	const [study_group_numb, setStudy_group_numb] = useState(1);
	const [study_ref_aid, setStudy_ref_aid] = useState('');
	const [best_study_hour, setBest_study_hour] = useState('');
	const [study_time_day, setStudy_time_day] = useState(1);
	const [study_frequency, setStudy_frequency] = useState('');
	const [perc_atention_generic, setPerc_atention_generic] = useState(10);
	const [perc_atention_notchallenge, setPerc_atention_notchallenge] = useState(10);
	const [perc_atention_challenge, setPerc_atention_challenge] = useState(10);
	const [study_screen_time_day, setStudy_screen_time_day] = useState(1);
	const [leisure_screen_time_day, setLeisure_screen_time_day] = useState(1);
	const [study_zone, setStudy_zone] = useState('');
	const [social_group_number, setSocial_group_number] = useState(1);
	const [physical_activity_time, setPhysical_activity_time] = useState(1);
	const [transportation, setTransportation] = useState('');
	const [gender, setGender] = useState('');
	const [family_edutation_criteria, setFamily_edutation_criteria] = useState('');
	
	//Options configurations
	const edu_lavel_options = [
								{ value: "primario", label: "primario" },
								{ value: "secundario", label: "secundario" },
								{ value: "universitario", label: "universitario" },
								{ value: "especializado", label: "especializado" },
							];
	const motivation_options = [
								{ value: "Ninguno", label: "Ninguno" },
								{ value: "Bajo", label: "Bajo" },
								{ value: "Medio", label: "Medio" },
								{ value: "Alto", label: "Alto" },
							];
	const eco_aid_options = [
								{ value: "Bajo", label: "Bajo" },
								{ value: "Medio", label: "Medio" },
								{ value: "Alto", label: "Alto" },
							];
	const inspiration_options = [
								{ value: "a", label: "De sus padres" },
								{ value: "b", label: "De su madre" },
								{ value: "c", label: "De su padre" },
								{ value: "d", label: "De un familiar no parental" },
								{ value: "e", label: "De un vecino o amistad" },
								{ value: "f", label: "De medios audiovisuales" },
								{ value: "g", label: "De información textual (Libros, Revistas, etc." },
								{ value: "h", label: "Combinación fuentes" },
							];

	const info_stud_options = [
								{ value: "a", label: "Bibliografía de clases" },
								{ value: "b", label: "Video tutoriales" },
								{ value: "c", label: "Documentación proveniente de Internet" },
								{ value: "d", label: "Notas de otros compañeros" },
								{ value: "e", label: "Notas propias" },
								{ value: "f", label: "Combinadas (desde (a-e))" },
								{ value: "g", label: "Ninguna de las opciones mencionadas" },
								{ value: "h", label: "Femenino" },
								];
	const stu_hour_options = [
								{ value: "a", label: "Mañanas" },
								{ value: "b", label: "Tardes" },
								{ value: "c", label: "Noches" },
								{ value: "d", label: "Sin importancia" },
							];
	const stu_frec_options = [
								{ value: "a", label: "Antes del examen o el test" },
								{ value: "b", label: "Periódicamente" },
								{ value: "c", label: "Esporádicamente" },
								{ value: "d", label: "Muy poca" },
							];
	const stu_zone_options = [
								{ value: "a", label: "Zona de estudio formal recurrente (Casa o Zona que utiliza en un 90% de las ocaciones)" },
								{ value: "b", label: "Zona de estudio formal no recurrente (Lab, Bib)" },
								{ value: "c", label: "Zona de estudio no formal recurrente" },
								{ value: "d", label: "Zona de estudio no formal no recurrente" },
								{ value: "e", label: "No relevante" },
								{ value: "f", label: "Mixta" },
							];
	const transportation_options = [
									{ value: "a", label: "Facilidades propias de transporte" },
									{ value: "b", label: "Simple desplazamiento" },
									{ value: "c", label: "Simple desplazamiento más transporte formal" },
									{ value: "d", label: "Simple desplazamiento más transporte informal" },
									{ value: "e", label: "Mixto" },
								];		
								
	const gender_options = [
						{ value: "M", label: "Masculino" },
						{ value: "F", label: "Femenino" },
					];
	const education_criteria_options = [
									{ value: "a", label: "Estudiar es el camino para ser alguien en la vida." },
									{ value: "b", label: "Estudiando una carrera tendrás estabilidad económica." },
									{ value: "c", label: "Estudiar lo que a uno le gusta para sentirse realizado." },
									{ value: "d", label: "Mejor aprovechar el tiempo en otras opciones." },
								];	
	
	
	//date.toISOString().split('T')[0],
	const add_questionary = async () => {
		
		await axios({
			method: 'post',
			url: '/add_questionary/',
			data: {
				opinion_generic: formik.values.opinion_generic,
				opinion_notchallenge: formik.values.opinion_notchallenge,
				opinion_challenge: formik.values.opinion_challenge,
				mother_educ_lavel: formik.values.mother_educ_lavel,
				father_educ_lavel: formik.values.father_educ_lavel,
				mother_motivation: formik.values.mother_motivation,
				father_motivation: formik.values.father_motivation,
				eco_aid_mother: formik.values.eco_aid_mother,
				eco_aid_father: formik.values.eco_aid_father,
				student_inspiration: formik.values.student_inspiration,
				study_group_numb: formik.values.study_group_numb,
				study_ref_aid: formik.values.study_ref_aid,
				best_study_hour: formik.values.best_study_hour,
				study_time_day: formik.values.study_time_day,
				study_frequency: formik.values.study_frequency,
				perc_atention_generic: formik.values.perc_atention_generic,
				perc_atention_notchallenge: formik.values.perc_atention_notchallenge,
				perc_atention_challenge: formik.values.perc_atention_challenge,
				study_screen_time_day: formik.values.study_screen_time_day,
				leisure_screen_time_day: formik.values.leisure_screen_time_day,
				study_zone: formik.values.study_zone,
				social_group_number: formik.values.social_group_number,
				physical_activity_time: formik.values.physical_activity_time,
				transportation: formik.values.transportation,
				gender: formik.values.gender,
				family_edutation_criteria: formik.values.family_edutation_criteria,
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {				
				setMessages("Questionario creado"+ Math.random());
				toast.success("Questionario adicionado exitosamente");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
		});				  
	}
  
	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		
		setValidated(true);		
		event.preventDefault();
		
		if (validated){
			if (opinion_generic !== opinion_notchallenge &&
					opinion_generic !== opinion_challenge &&
					opinion_notchallenge !== opinion_challenge){
				add_questionary();
			}else{
				Swal.fire("Sus opiniones no deben coincidir", "", "error");
			}
		}
	}
	
	const digitsOnly = (value) => /^\d+$/.test(value) //--:/^[0-9]d+$/
	
	const validationRules = Yup.object().shape({
		opinion_generic: Yup.string().trim()	
			.min(20, "Su opinión debe contener 20 letras como mínimo")
			.max(150, "Su opinión debe contener 150 letras como máximo")
			.required("Se requiere de una opinión"),
		opinion_notchallenge: Yup.string().trim()	
			.min(20, "Su opinión debe contener 20 letras como mínimo")
			.max(150, "Su opinión debe contener 150 letras como máximo")
			.required("Se requiere de una opinión"),
		opinion_challenge: Yup.string().trim()	
			.min(20, "Su opinión debe contener 20 letras como mínimo")
			.max(150, "Su opinión debe contener 150 letras como máximo")
			.required("Se requiere de una opinión"),
		mother_educ_lavel: Yup.string()
			.required("Se requiere indique el nivel educativo"),
		father_educ_lavel: Yup.string()
			.required("Se requiere indique el nivel educativo"),
		mother_motivation: Yup.string()
			.required("Se requiere indique la motivación"),
		father_motivation: Yup.string()
			.required("Se requiere indique la motivación"),
		eco_aid_mother: Yup.string()
			.required("Se requiere indique ayuda de la madre"),		
		eco_aid_father: Yup.string()
			.required("Se requiere indique ayuda del padre"),
		student_inspiration: Yup.string()
			.required("Se requiere indique inspiración para el estudio"),
		study_group_numb: Yup.number().integer()
			.required("Se requiere indique número de estudiantes para estudio")
			.test("Solo números", "Introduzca valores numéricos", digitsOnly),
		study_ref_aid: Yup.string()
			.required("Se requiere indique referencias para estudio"),
		best_study_hour: Yup.string()
			.required("Se requiere indique mejor hora de estudio"),
		study_time_day: Yup.number().integer()
			.required("Se requiere indique tiempo de estudio al día")
			.test("Solo números", "Introduzca valores numéricos", digitsOnly),
		study_frequency: Yup.string()
			.required("Se requiere indique frecuencia de estudio"),
		perc_atention_generic: Yup.number().integer()
			.required("Se requiere indique porciento de atención")
			.test("Solo números", "Introduzca valores numéricos", digitsOnly),
		perc_atention_notchallenge: Yup.number().integer()
			.required("Se requiere indique porciento de atención")
			.test("Solo números", "Introduzca valores numéricos", digitsOnly),
		perc_atention_challenge: Yup.number().integer()
			.required("Se requiere indique porciento de atención")
			.test("Solo números", "Introduzca valores numéricos", digitsOnly),
		study_screen_time_day: Yup.number().integer()
			.required("Se requiere indique tiempo de pantalla al día")
			.test("Solo números", "Introduzca valores numéricos", digitsOnly),
		leisure_screen_time_day: Yup.number().integer()
			.required("Se requiere indique tiempo de pantalla para el ocio al día")
			.test("Solo números", "Introduzca valores numéricos", digitsOnly),
		study_zone: Yup.string()
			.required("Se requiere indique mejor zona de estudio"),
		social_group_number: Yup.number().integer()
			.required("Se requiere indique número de personas para socializar")
			.test("Solo números", "Introduzca valores numéricos", digitsOnly),			
		physical_activity_time: Yup.number().integer()
			.required("Se requiere indique tiempo de actividad física al día")
			.test("Solo números", "Introduzca valores numéricos", digitsOnly),
		transportation: Yup.string()
			.required("Se requiere indique tipo de transporte comúnmemte"),
		gender: Yup.string()
			.required("Se requiere indique género"),
		family_edutation_criteria: Yup.string()
			.required("Se requiere indique criterio familiar para el estudio"),
	});
	
	const registerInitialValues = {
		opinion_generic: '',
		opinion_notchallenge: '',
		opinion_challenge: '',
		mother_educ_lavel: edu_lavel_options[0]["value"],
		father_educ_lavel: edu_lavel_options[0]["value"],
		mother_motivation: motivation_options[0]["value"],
		father_motivation: motivation_options[0]["value"],
		eco_aid_mother: eco_aid_options[0]["value"],
		eco_aid_father: eco_aid_options[0]["value"],
		student_inspiration: inspiration_options[0]["value"],
		study_group_numb: 1,
		study_ref_aid: info_stud_options[0]["value"],
		best_study_hour: stu_hour_options[0]["value"],
		study_time_day: 1,
		study_frequency: stu_frec_options[0]["value"],
		perc_atention_generic: 0,
		perc_atention_notchallenge: 0,
		perc_atention_challenge: 0,
		study_screen_time_day: 1,
		leisure_screen_time_day: 1,
		study_zone: stu_zone_options[0]["value"],
		social_group_number: 1,
		physical_activity_time: 1,
		transportation: transportation_options[0]["value"],
		gender: gender_options[0]["value"],
		family_edutation_criteria: education_criteria_options[0]["value"], 
	};
	
	const formik = useFormik({
		initialValues: registerInitialValues,
		onSubmit: (values) => {
			console.log("Save data...")
			console.log(values)
			add_questionary();
			formik.resetForm();
		},
		validationSchema: validationRules
	});
	
	const RenderOptions = (listValues) => {
		return (
			listValues.map(item => 
				<option value={item.value} label={item.label}>{item.value}</option>
			) 
		)
	};

	return (
		<>
			<ToastContainer />
			<form className="form-control" onSubmit={formik.handleSubmit}>
				<div className="form-group mt-3">
					<label>Introduzca su estrategia para estudiar asignaturas de complejidad genérica</label>
					<textarea
					  name="opinion_generic"
					  rows="2"
					  value={formik.values.opinion_generic}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.opinion_generic && formik.touched.opinion_generic
									? "is-invalid" : "" )}
					  placeholder="Opinión de estrategia de estudio para asignaturas de complejidad genérica"
					>
					</textarea>
					<div>{(formik.errors.opinion_generic) ? <p style={{color: 'red'}}>{formik.errors.opinion_generic}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Introduzca su estrategia para estudiar asignaturas de complejidad baja para usted</label>
					<textarea
					  name="opinion_notchallenge"
					  rows="2"
					  value={formik.values.opinion_notchallenge}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.opinion_notchallenge && formik.touched.opinion_notchallenge
									? "is-invalid" : "" )}
					  placeholder="Opinión de estrategia de estudio para asignaturas de complejidad no retadora"
					>
					</textarea>
					<div>{(formik.errors.opinion_notchallenge) ? <p style={{color: 'red'}}>{formik.errors.opinion_notchallenge}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Introduzca su estrategia para estudiar asignaturas de complejidad alta para usted</label>
					<textarea
					  rows="2"
					  name="opinion_challenge"
					  value={formik.values.opinion_challenge}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.opinion_challenge && formik.touched.opinion_challenge
									? "is-invalid" : "" )}
					  placeholder="Opinión de estrategia de estudio para asignaturas de complejidad retadora"
					>
					</textarea>
					<div>{(formik.errors.opinion_challenge) ? <p style={{color: 'red'}}>{formik.errors.opinion_challenge}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Seleccione el nivel educativo de la madre</label>
					<select
					  type="text"
					  name="mother_educ_lavel"
					  value={formik.values.mother_educ_lavel}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.mother_educ_lavel && formik.touched.mother_educ_lavel
									? "is-invalid" : "" )}
					  //placeholder="Seleccione el nivel educativo de la madre"
					>
						{RenderOptions(edu_lavel_options)} 
					</select>
					<div>{(formik.errors.mother_educ_lavel) ? <p style={{color: 'red'}}>{formik.errors.mother_educ_lavel}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Seleccione el nivel educativo del padre</label>
					<select
					  type="text"
					  name="father_educ_lavel"
					  value={formik.values.father_educ_lavel}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.father_educ_lavel && formik.touched.father_educ_lavel
									? "is-invalid" : "" )}
					  //placeholder="Seleccione el nivel educativo del padre"
					>
						{RenderOptions(edu_lavel_options)} 
					</select>
					<div>{(formik.errors.father_educ_lavel) ? <p style={{color: 'red'}}>{formik.errors.father_educ_lavel}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Seleccione el nivel de motivación de la madre</label>
					<select
					  type="text"
					  name="mother_motivation"
					  value={formik.values.mother_motivation}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.mother_motivation && formik.touched.mother_motivation
									? "is-invalid" : "" )}
					  //placeholder="Seleccione el nivel de motivación de la madre"
					>
						{RenderOptions(motivation_options)} 
					</select>
					<div>{(formik.errors.mother_motivation) ? <p style={{color: 'red'}}>{formik.errors.mother_motivation}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Seleccione el nivel de motivación del padre</label>
					<select
					  type="text"
					  name="father_motivation"
					  value={formik.values.father_motivation}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.father_motivation && formik.touched.father_motivation
									? "is-invalid" : "" )}
					  //placeholder="Seleccione el nivel de motivación del padre"
					>
						{RenderOptions(motivation_options)} 
					</select>
					<div>{(formik.errors.father_motivation) ? <p style={{color: 'red'}}>{formik.errors.father_motivation}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Seleccione el nivel ayuda económica de la madre</label>
					<select
					  type="text"
					  name="eco_aid_mother"
					  value={formik.values.eco_aid_mother}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.eco_aid_mother && formik.touched.eco_aid_mother
									? "is-invalid" : "" )}
					  //placeholder="Seleccione el nivel ayuda económica de la madre"
					>
						{RenderOptions(eco_aid_options)} 
					</select>
					<div>{(formik.errors.eco_aid_mother) ? <p style={{color: 'red'}}>{formik.errors.eco_aid_mother}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Seleccione el nivel ayuda económica del padre</label>
					<select
					  type="text"
					  name="eco_aid_father"
					  value={formik.values.eco_aid_father}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.eco_aid_father && formik.touched.eco_aid_father
									? "is-invalid" : "" )}
					  //placeholder="Seleccione el nivel ayuda económica del padre"
					>
						{RenderOptions(eco_aid_options)} 
					</select>
					<div>{(formik.errors.eco_aid_father) ? <p style={{color: 'red'}}>{formik.errors.eco_aid_father}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Seleccione fuente de inspiración para el estudio</label>
					<select
					  type="text"
					  name="student_inspiration"
					  value={formik.values.student_inspiration}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.student_inspiration && formik.touched.student_inspiration
									? "is-invalid" : "" )}
					  //placeholder="Seleccione fuente de inspiración para el estudio"
					>
						{RenderOptions(inspiration_options)} 
					</select>
					<div>{(formik.errors.student_inspiration) ? <p style={{color: 'red'}}>{formik.errors.student_inspiration}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Introduzca el número de personas en su grupo de estudio</label>
					<input
					  type="text"
					  name="study_group_numb"
					  value={formik.values.study_group_numb}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.study_group_numb && formik.touched.study_group_numb
									? "is-invalid" : "" )}
					  placeholder="Valores superiores o iguales 0"
					/>
					<div>{(formik.errors.study_group_numb) ? <p style={{color: 'red'}}>{formik.errors.study_group_numb}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Seleccione el tipo de referencias empleada para el estudio</label>
					<select
					  type="text"
					  name="study_ref_aid"
					  value={formik.values.study_ref_aid}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.study_ref_aid && formik.touched.study_ref_aid
									? "is-invalid" : "" )}
					  //placeholder="Seleccione el tipo de referencias empleada para el estudio"
					>
						{RenderOptions(info_stud_options)} 
					</select>
					<div>{(formik.errors.study_ref_aid) ? <p style={{color: 'red'}}>{formik.errors.study_ref_aid}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Seleccione la mejor hora del día para el estudio</label>
					<select
					  type="text"
					  name="best_study_hour"
					  value={formik.values.best_study_hour}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.best_study_hour && formik.touched.best_study_hour
									? "is-invalid" : "" )}
					  //placeholder="Seleccione la mejor hora del día para el estudio"
					>
						{RenderOptions(stu_hour_options)} 
					</select>
					<div>{(formik.errors.best_study_hour) ? <p style={{color: 'red'}}>{formik.errors.best_study_hour}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Introduzca el tiempo de estudio (en horas) al día</label>
					<input
					  type="text"
					  name="study_time_day"
					  value={formik.values.study_time_day}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.study_time_day && formik.touched.study_time_day
									? "is-invalid" : "" )}
					  placeholder="Valores superiores ao iguales a 0"
					/>
					<div>{(formik.errors.study_time_day) ? <p style={{color: 'red'}}>{formik.errors.study_time_day}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Seleccione la frecuencia de estudio que mejor se ajusta</label>
					<select
					  type="text"
					  name="study_frequency"
					  value={formik.values.study_frequency}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.study_frequency && formik.touched.study_frequency
									? "is-invalid" : "" )}
					  //placeholder="Seleccione la frecuencia de estudio que mejor se ajusta"
					>
						{RenderOptions(stu_frec_options)} 
					</select>
					<div>{(formik.errors.study_frequency) ? <p style={{color: 'red'}}>{formik.errors.study_frequency}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Introduzca el porciento de atención que presta a asignaturas de complejidad genérica</label>
					<input
					  type="text"
					  name="perc_atention_generic"
					  value={formik.values.perc_atention_generic}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.perc_atention_generic && formik.touched.perc_atention_generic
									? "is-invalid" : "" )}
					  placeholder="Valores superiores o iguales a 0"
					/>
					<div>{(formik.errors.perc_atention_generic) ? <p style={{color: 'red'}}>{formik.errors.perc_atention_generic}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Introduzca el porciento de atención que presta a asignaturas de complejidad no retadora</label>
					<input
					  type="text"
					  name="perc_atention_notchallenge"
					  value={formik.values.perc_atention_notchallenge}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.perc_atention_notchallenge && formik.touched.perc_atention_notchallenge
									? "is-invalid" : "" )}
					  placeholder="Valores superiores o iguales a 0"
					/>
					<div>{(formik.errors.perc_atention_notchallenge) ? <p style={{color: 'red'}}>{formik.errors.perc_atention_notchallenge}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Introduzca el porciento de atención que presta a asignaturas de complejidad retadora</label>
					<input
					  type="text"
					  name="perc_atention_challenge"
					  value={formik.values.perc_atention_challenge}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.perc_atention_challenge && formik.touched.perc_atention_challenge
									? "is-invalid" : "" )}
					  placeholder="Valores superiores o iguales a 0"
					/>
					<div>{(formik.errors.perc_atention_challenge) ? <p style={{color: 'red'}}>{formik.errors.perc_atention_challenge}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Introduzca el tiempo (en horas) de pantalla (móvil, pc, etc...) para estudio</label>
					<input
					  type="text"
					  name="study_screen_time_day"
					  value={formik.values.study_screen_time_day}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.study_screen_time_day && formik.touched.study_screen_time_day
									? "is-invalid" : "" )}
					  placeholder="Valores entre 0 y 24"
					/>
					<div>{(formik.errors.study_screen_time_day) ? <p style={{color: 'red'}}>{formik.errors.study_screen_time_day}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Introduzca el tiempo (en horas) de pantalla (móvil, pc, etc...) para ocio</label>
					<input
					  type="text"
					  name="leisure_screen_time_day"
					  value={formik.values.leisure_screen_time_day}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.leisure_screen_time_day && formik.touched.leisure_screen_time_day
									? "is-invalid" : "" )}
					  placeholder="Valores entre 0 y 24"
					/>
					<div>{(formik.errors.leisure_screen_time_day) ? <p style={{color: 'red'}}>{formik.errors.leisure_screen_time_day}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Seleccione la zona de estudio empleada con frecuencia</label>
					<select
					  type="text"
					  name="study_zone"
					  value={formik.values.study_zone}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.study_zone && formik.touched.study_zone
									? "is-invalid" : "" )}
					  //placeholder="Seleccione la zona de estudio empleada con frecuencia"
					>
						{RenderOptions(stu_zone_options)} 
					</select>
					<div>{(formik.errors.study_zone) ? <p style={{color: 'red'}}>{formik.errors.study_zone}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Introduzca el número de miembros de su grupos social</label>
					<input
					  type="text"
					  name="social_group_number"
					  value={formik.values.social_group_number}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.social_group_number && formik.touched.social_group_number
									? "is-invalid" : "" )}
					  placeholder="Valores superiores o iguales 0"
					/>
					<div>{(formik.errors.social_group_number) ? <p style={{color: 'red'}}>{formik.errors.social_group_number}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Introduzca el tiempo (en horas) dedicado a actividad física</label>
					<input
					  type="text"
					  name="physical_activity_time"
					  value={formik.values.physical_activity_time}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.physical_activity_time && formik.touched.physical_activity_time
									? "is-invalid" : "" )}
					  placeholder="Valores entre 0 y 24"
					/>
					<div>{(formik.errors.physical_activity_time) ? <p style={{color: 'red'}}>{formik.errors.physical_activity_time}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Seleccione el tipo de trasortación que emplea regularmente para ir al estudio</label>
					<select
					  type="text"
					  name="transportation"
					  value={formik.values.transportation}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.transportation && formik.touched.transportation
									? "is-invalid" : "" )}
					  //placeholder="Seleccione el tipo de trasortación que emplea regularmente para ir al estudio"
					>
						{RenderOptions(transportation_options)} 
					</select>
					<div>{(formik.errors.transportation) ? <p style={{color: 'red'}}>{formik.errors.transportation}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Seleccione su género</label>
					<select
					  type="text"
					  name="gender"
					  value={formik.values.gender}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.gender && formik.touched.gender
									? "is-invalid" : "" )}
					  //placeholder="Seleccione su género"
					>
						{RenderOptions(gender_options)} 						
					</select>
					<div>{(formik.errors.gender) ? <p style={{color: 'red'}}>{formik.errors.gender}</p> : null}</div>
				</div>
				<div className="form-group mt-3">
					<label>Seleccione que criterio usted cree util para el estudio según su familia</label>
					<select
					  type="text"
					  name="family_edutation_criteria"
					  value={formik.values.family_edutation_criteria}
					  onChange={formik.handleChange}
					  onBlur={formik.handleBlur}
					  className={"form-control mt-1" + 
									(formik.errors.family_edutation_criteria && formik.touched.family_edutation_criteria
									? "is-invalid" : "" )}
					  //placeholder="Seleccione que criterio usted cree util para el estudio según su familia"
					>
						{RenderOptions(education_criteria_options)} 						
					</select>
					<div>{(formik.errors.family_edutation_criteria) ? <p style={{color: 'red'}}>{formik.errors.family_edutation_criteria}</p> : null}</div>
				</div>
				
				<div className="d-grid gap-2 mt-3">
					<button type="submit" className="btn btn-success">
							Guardar datos
					</button>					
				</div>		
			</form>
		</>
	);
}