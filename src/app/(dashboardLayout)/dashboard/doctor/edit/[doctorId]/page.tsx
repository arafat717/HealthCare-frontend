type TParams = {
  params: {
    doctorId: string;
  };
};

const DoctorUpdatePage = ({ params }: TParams) => {
  console.log(params);
  return (
    <div>
      <h1>this is doctior update pages</h1>
    </div>
  );
};

export default DoctorUpdatePage;
