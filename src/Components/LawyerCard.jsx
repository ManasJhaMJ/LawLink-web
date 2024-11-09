function LawyerCard(props) {
    
    return (
      <div className="py-10 bg-gradient-to-tr shadow-lg shadow-blue-500/50 from-[#C5D8F6] to-[#FFFFFF] rounded-lg">
        <div className="mx-2 flex flex-wrap items-center justify-around">
          <img
            src={props.imageUrl}
            alt={props.name}
            className="w-10 h-24 rounded-full object-cover"
          />
          <h2 className="text-2xl font-bold text-center">{props.name}</h2>
        </div>
  
        <div className="flex flex-wrap items-center gap-1 mt-1">
          <span className="text-gray-600 mx-2">Rating: {props.rating}/5</span>
        </div>
  
        <div className="flex flex-wrap items-center gap-2 mx-2">
          <div className="text-gray-500">
            <span>Education: {props.education}</span>
          </div>
        </div>
  
        <div className="flex flex-wrap items-center gap-2 mx-2">
          <div className="text-gray-500 hover:underline">
            Email: {props.email}
          </div>
        </div>
  
        <div className="flex flex-wrap items-center gap-2 mx-2">
          <div className="text-gray-500 hover:underline">
            Contact No. {props.phone}
          </div>
        </div>
  
        <div className="flex flex-wrap items-center gap-2 mx-2">
          <div className="text-gray-500">
            <span>Location: {props.location}</span>
          </div>
        </div>
  
        <div>
          <h3 className="text-gray-500 mx-2 mb-2">Practice Areas:- </h3>
          <div className="flex flex-wrap gap-3">
            {props.practicingAreas && props.practicingAreas.length > 0 ? (
              props.practicingAreas.map((area, index) => (
                <div key={index} className="rounded-lg text-sm px-2 mb-3 bg-blue-600">
                  {area}
                </div>
              ))
            ) : (
              <div>No practice areas available</div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default LawyerCard;
  