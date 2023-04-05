import {useEffect, useState} from "react";
import { useForm } from "react-hook-form"
import Arrow_img from "./assest/images/icon-arrow.svg";
import './index.css';
import './assest/style.scss';



function App() {
    const [icon , SetIcon ] = useState(<img src={Arrow_img} className="btnNotActive" alt=""/>)
    const [customError , SetCustomError ] = useState({m:false , d:false})
    const [dataForm , SetDataForm] = useState([
        {
            name :"year",
            value:"",
            id:0
        },
        {
            name :"month",
            value:"",
            id:1
        },
        {
            name :"day",
            value:"",
            id:2
        },
    ])
    useEffect(()=>{
        console.table("dataForm")
        console.table(dataForm)
        console.table("dataForm")
    },[dataForm])
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        let today = new Date();
        if (parseInt(data.year) ===  today.getFullYear()  ){
            if (  parseInt(data.month) > today.getMonth()+1){
                SetCustomError({...customError , m:true})
                console.log("errore from month invalid")
            }else if( parseInt(data.day) > today.getDate()){
                console.log("errore from day invalid")
                SetCustomError({...customError , d:true})
            }else {
                SetCustomError({m:false , d:false})
                calculateAge(`${data.year}/${data.month}/${data.day}`)
            }
        }else {
            SetCustomError({m:false , d:false})
            calculateAge(`${data.year}/${data.month}/${data.day}`)
        }

    }
    function calculateAge(date) {
        let today = new Date();
        let oldDate = new Date(date);
        let years = today.getFullYear() - oldDate.getFullYear();
        let months = today.getMonth() - oldDate.getMonth();
        let days = today.getDate() - oldDate.getDate();

        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }
        if (days < 0) {
            let monthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            days += monthDays;
            months--;
        }

        SetIcon(<img src={Arrow_img} className="btnActive" alt=""/> )
        setTimeout(()=>{
            SetIcon(<img src={Arrow_img} className="btnNotActive" alt=""/>)
            SetDataForm([
                {
                    name :"year",
                    value:years,
                    id:0
                },
                {
                    name :"month",
                    value:months,
                    id:1
                },
                {
                    name :"day",
                    value:days,
                    id:2
                },
            ])
        },1500)

    }

    return (
      <div className="container">
          <div className="w-full h-screen   flex-center">
                  <div className="box_container bg-white p-5 lg:p-24    ">
                      <form onSubmit={handleSubmit(onSubmit)} className="">
                          <div className="w-full flex justify-between lg:justify-start gap-5   " >
                              <div className="w-[32%] lg:w-[25%] ">
                                  <label className={`block ${errors.day ? 'text-red-700' : 'text-gray-700'} font-bold mb-2`}  htmlFor="day">DAY </label>
                                  <input  className="custom-Input appearance-none " type="number" placeholder="DD" id="day" {...register("day", { required: true , max:31, min:1 })} />
                                  <label className="block text-red-700 font-bold mt-2" htmlFor="day">{(errors.day || customError.d === true) && " Must be a valid day"} </label>
                              </div>
                              <div className="w-[32%] lg:w-[25%] ">
                                  <label className={`block ${errors.month ? 'text-red-700' : 'text-gray-700'} font-bold mb-2`}  htmlFor="month">MONTH </label>
                                  <input className="custom-Input  appearance-none" type="number" placeholder="MM" id="month" {...register("month", { required: true , max:12 , min:1})} />
                                  <label className="block text-red-700 font-bold mt-2" htmlFor="month">{(errors.month || customError.m === true)  && " Must be a valid month"} </label>
                              </div>
                              <div className="w-[32%] lg:w-[25%] ">
                                  <label className={`block ${errors.year ? 'text-red-700' : 'text-gray-700'} font-bold mb-2`}  htmlFor="year">YEAR </label>
                                  <input  className="custom-Input appearance-none " type="number" placeholder="YYYY" id="year" {...register("year", { required: true , max:2023 , min:1000 , })} />
                                  <label className="block text-red-700 font-bold mt-2" htmlFor="year">{errors.year && " Must be a valid day"} </label>
                              </div>
                          </div>

                          <div className="h-[50px] my-[5rem] relative">
                              <hr/>
                              <button type="submit" className="btn_calc   w-[80px] h-[80px]  lg:w-[100px] lg:h-[100px] ">{icon}</button>
                          </div>
                      </form>
                      {errors.exampleRequired && <span>This field is required</span>}
                      <div className="flex flex-col result_text">
                          {
                              dataForm.map((item)=><span className="c-cerulean-frost" key={item.id}><span className="c-lavender-indigo"> {item.value? item.value : "0"} </span>{item.name}</span>)
                          }
                      </div>
                  </div>
          </div>
      </div>
  );
}

export default App;
