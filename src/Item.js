export default function Item(props){
    let style = {
        backgroundColor : props.status ? "lightgreen" : "#ed3315"
    }
    return (
        <div className="item">
            <div className="item-title">{props.title}</div>
            <div className="item-details">{props.description}</div>
            <div className="edit">
                <div style={style} className="status">{props.status ? "Complete" : "Pending"}</div>
                <button className="but change-but" onClick={() => props.updateStatus(props.id)}>Change Status</button>
                <button className="but del-but" onClick={() => props.deleteTask(props.id)}>Delete</button>
            </div>
        </div>
    );
}