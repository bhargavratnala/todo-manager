import './App.css';
import Item from './Item';
import {useState, useEffect} from 'react';

export default function App(){

    let [formData, changeFormDate] = useState({title:"", description : "", status:false});
    
    let [data, chageData] =useState([]);

    useEffect(()=>{
        let arrdata;
        arrdata = localStorage.getItem("data");
        console.log(arrdata);
        if(arrdata == null || arrdata === ''){
            arrdata = [];
        }
        else{
            arrdata = JSON.parse(arrdata);
        }
        chageData(arrdata);
    }, []);

    function deleteTask(ind){
        chageData(prev => {
            let update = [];
            for(let i =0; i<prev.length; i++){
                if(i===ind)
                continue;
                update.push(prev[i]);
            }
            localStorage.setItem("data", JSON.stringify(update));
            return update;
        })
    }

    function updateStatus(ind){
        chageData(prev => {
            let update = [];
            for(let i=0; i<prev.length; i++){
                if(i===ind){
                    let obj = {...prev[i], status : !prev[i].status};
                    update.push(obj);
                }
                else{
                    update.push(prev[i]);
                }
            }
            localStorage.setItem("data", JSON.stringify(update));
            return update;
        })
    }

    function handleChange(event){
        changeFormDate(prev => {
            let obj = {...prev,
            [event.target.name] : event.target.value};
            return obj;
        })
    }

    function addData(){
        if(data.title === '' || data.description === ''){
            return;
        }
        chageData(prev => {
            let update = [...prev];
            update.push(formData);
            changeFormDate({title:"", description : "", status:false});
            localStorage.setItem("data", JSON.stringify(update));
            return update;
        });
    }

    let elements = data.map((obj, ind) => {
        return <Item title={obj.title} description={obj.description} status={obj.status} deleteTask={deleteTask} updateStatus={updateStatus} key={ind} id={ind}/>;
    })

    return (
        <>
            <nav className="nav">
                <h2 className="title">Todo List</h2>
            </nav>
            <div className="body">
                <div className="form">
                    <input type='text' value={formData.title} name="title" placeholder='Title' className="form-input form-title" onChange={handleChange}/>
                    <input type='text' value={formData.description} name="description" placeholder='Description' className="form-input form-description" onChange={handleChange}/>
                    <button className="form-but" onClick={addData}>Add</button>
                </div>
                <div className="item">
                    <span className="item-title">Task Name</span>
                    <span className="item-details">Description</span>
                    <div className="edit">
                        <span className="item-title">status</span>
                        <span className="item-title">update status</span>
                        <span className="item-title">delete</span>
                    </div>
                </div>
                {elements.length>0 ? elements : <div className='notask'> No Tasks</div>}
            </div>
        </>
    );
}