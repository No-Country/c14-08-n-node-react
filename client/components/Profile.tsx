const Profile = () => {
  return (
    <div className="lg:mt-[84px] lg:bg-gray-400">
      <div className="main-container flex flex-col items-center py-[40px]">
        <div className="h-[118px] w-[118px] rounded-full bg-gray-700" />
        <p className="mt-[10px] text-[25px]">Name</p>
        <div className="mt-[20px] flex w-full max-w-[350px] flex-col gap-[5px]">
          <div className="rounded-[10px] border border-gray-700 bg-white py-[22px] text-center text-[16px]">
            Mis datos
          </div>
          <div className="rounded-[10px] border border-gray-700 bg-white py-[22px] text-center text-[16px]">
            Mis turnos pendientes
          </div>
          <div className="rounded-[10px] border border-gray-700 bg-white py-[22px] text-center text-[16px]">
            Pagos realizados
          </div>
          <div className="rounded-[10px] border border-gray-700 bg-white py-[22px] text-center text-[16px]">
            Historial de tramites
          </div>
          <div className="rounded-[10px] border border-gray-700 bg-white py-[22px] text-center text-[16px]">
            Configuraciones
          </div>
          <div className="py-[22px] text-center text-[16px]">Cerrar sesión</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
