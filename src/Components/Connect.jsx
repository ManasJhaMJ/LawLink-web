import LawyerCard from "./LawyerCard"
import lawyersData from "../lawyersData"

function Connect() {
  return (
    <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Connect with Lawyers</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lawyersData.map((lawyer, index) => (
        <LawyerCard key={index} {...lawyer} />
      ))}
    </div>
  </div>
  )
}

export default Connect