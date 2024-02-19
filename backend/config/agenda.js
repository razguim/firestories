import { Agenda } from "@hokify/agenda";

const agenda = new Agenda({ db: { address: process.env.DB_URL } });
export default agenda
