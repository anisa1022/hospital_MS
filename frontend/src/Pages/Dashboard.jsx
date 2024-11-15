import Cards from '../components/Cards.jsx'
import { Building2, Users, UserPlus, Calendar, Stethoscope } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Departments', value: 12, icon: Building2 },
    { title: 'Total Doctors', value: 48, icon: Stethoscope },
    { title: 'Total Patients', value: 1024, icon: Users },
    { title: 'Total Appointments', value: 256, icon: Calendar },
    { title: 'Total Users', value: 1280, icon: UserPlus },
  ];

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Cards key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </div>
    </>
  );
}