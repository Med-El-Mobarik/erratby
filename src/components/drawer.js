import { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import "./style.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import HourglassBottomOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import { PieChart, Pie, Tooltip } from "recharts";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  // ResponsiveContainer,
} from "recharts";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Drawer = () => {
  const [elem, setelem] = useState("dach");
  const [etat, setetat] = useState("--");
  const [machines, setmachines] = useState([]);
  const [employees, setemployees] = useState([]);
  const [produits, setproduits] = useState([]);
  const [data1, setdata1] = useState([]);
  const [data2, setdata2] = useState([]);
  const [data3, setdata3] = useState([]);
  const [data4, setdata4] = useState([
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      // amt: 2400,
    },
  ]);
  const machinesCollection = collection(db, "Machines");
  const employeesCollection = collection(db, "employees");
  const produitsCollection = collection(db, "produits");

  useEffect(() => {
    const getMachines = async () => {
      try {
        const data = await getDocs(machinesCollection);
        setmachines(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        const data01 = [
          { name: "Moins de 4", value: 0 },
          { name: "Entre 4 et 6", value: 0 },
          { name: "Plus de 6", value: 0 },
        ];
        const data3 = [
          {
            subject: "Supportive",
            A: 3,
            fullMark: 5,
          },
          {
            subject: "Principale",
            A: 2,
            fullMark: 5,
          },
          {
            subject: "Secondaire",
            A: 1,
            fullMark: 5,
          },
        ];
        data.docs.map((doc) => {
          if (doc.data().employees < 4) {
            data01[0].value = data01[0].value + 1;
          }
          if (doc.data().employees >= 4 && doc.data().employees <= 6) {
            data01[1].value = data01[1].value + 1;
          }
          if (doc.data().employees > 6) {
            data01[2].value = data01[2].value + 1;
          }
        });
        data.docs.map((doc) => {
          if (doc.data().type == 1) {
            data3[1].A = data3[1].A + 1;
          }
          if (doc.data().type == 2) {
            data3[2].A = data3[2].A + 1;
          }
          if (doc.data().employees == 3) {
            data3[0].A = data3[0].A + 1;
          }
        });
        setdata1(data01);
        setdata3(data3);
      } catch (error) {
        console.log(error);
      }
    };
    const getEmployees = async () => {
      try {
        const data = await getDocs(employeesCollection);
        setemployees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        const data02 = [
          { name: "Ingénieurs", value: 0 },
          { name: "Téchniciens", value: 0 },
          { name: "Ouvriers", value: 0 },
        ];
        data.docs.map((doc) => {
          // console.log(doc.data());
          if (doc.data().spec == "Engineer") {
            data02[0].value = data02[0].value + 1;
          }
          if (doc.data().spec === "Tech") {
            data02[1].value = data02[1].value + 1;
          }
          if (doc.data().spec === "worker") {
            data02[2].value = data02[2].value + 1;
          }
        });
        setdata2(data02);
      } catch (error) {
        console.log(error);
      }
    };

    const getProduits = async () => {
      try {
        const data = await getDocs(produitsCollection);
        setproduits(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        const data04 = [];
        let s1 = 0;
        let s2 = 0;
        data.docs.map((doc) => {
          // console.log(doc.data());
          s1 += doc.data().Current;
          s2 += doc.data().Goal;
          data04.push({
            name: doc.data().name,
            Goal: doc.data().Goal,
            Existant: doc.data().Current,
          });
        });
        setetat(((s1 / s2) * 100).toFixed(2));
        setdata4(data04);
      } catch (error) {
        console.log(error);
      }
    };

    getMachines();
    getEmployees();
    getProduits();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#f1f1f1",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "16%",
          backgroundColor: "#fff",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #c1c1c1",
        }}
      >
        <div
          style={{
            height: "40px",
            backgroundColor: "#e67e22",
            color: "#fff",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          Projet Gestion de production industrielle
        </div>
        <div style={{ marginTop: "80px" }}>
          <ul
            style={{ listStyle: "none", fontSize: "24px", padding: "0px 0px" }}
          >
            <li
              onClick={() => {
                setelem("dach");
              }}
              className="element"
              style={{
                backgroundColor: elem === "dach" ? "#bdc3c7" : "transparent",
              }}
            >
              <DashboardIcon
                style={{ color: "#e67e22", marginRight: "15px" }}
              />{" "}
              Dashboard
            </li>
            <li
              onClick={() => {
                setelem("chat");
              }}
              className="element"
              style={{
                backgroundColor: elem === "chat" ? "#bdc3c7" : "transparent",
              }}
            >
              <ChatIcon style={{ color: "#e67e22", marginRight: "15px" }} />{" "}
              Forum
            </li>
            <li
              onClick={() => {
                setelem("admin");
              }}
              className="element"
              style={{
                backgroundColor: elem === "admin" ? "#bdc3c7" : "transparent",
              }}
            >
              <PersonIcon style={{ color: "#e67e22", marginRight: "15px" }} />{" "}
              Admin
            </li>
          </ul>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "84%",
          // height: "150vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e67e22",
            color: "White",
            borderBottom: "2px solid #c1c1c1",
          }}
        >
          Encadré Par Mr. Erratby
        </div>
        <div>
          <div className="boxes">
            <div className="boxcontainer">
              <div className="box">
                <PrecisionManufacturingIcon
                  style={{ color: "#e67e22", fontSize: 50 }}
                />{" "}
                <h2 style={{ margin: 0 }}>N° Machines</h2>
              </div>
              <p style={{ fontSize: "26px", margin: "7px 0" }}>
                {machines.length === 0 ? "--" : machines.length}
              </p>
            </div>
            <div className="boxcontainer">
              <div className="box">
                <HourglassBottomOutlinedIcon
                  style={{ color: "#e67e22", fontSize: 50 }}
                />{" "}
                <h2 style={{ margin: 0 }}>Etat de Production</h2>
              </div>
              <p style={{ fontSize: "26px", margin: "7px 0" }}>{etat}%</p>
            </div>
            <div className="boxcontainer">
              <div className="box">
                <EngineeringOutlinedIcon
                  style={{ color: "#e67e22", fontSize: 50 }}
                />{" "}
                <h2 style={{ margin: 0 }}>nombre d'employés</h2>
              </div>
              <p style={{ fontSize: "26px", margin: "7px 0" }}>
                {employees.length === 0 ? "--" : employees.length}
              </p>
            </div>
          </div>
          <div className="machines">
            <h1 style={{ color: "#e67e22" }}>Les Machines</h1>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <div style={{ width: "28%", height: "300px" }}>
                <h3>Les Machines par N° d'employés</h3>
                <PieChart width={200} height={230}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data1}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </div>

              <div style={{ width: "50%", height: "300px" }}>
                <h3>Les Machines par types</h3>
                <ResponsiveContainer width="60%" height="80%">
                  <RadarChart cx="50%" cy="40%" outerRadius="60%" data={data3}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Mike"
                      dataKey="A"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ width: "28%", height: "300px" }}>
                <h3>Les Employés par Spécialité</h3>
                <PieChart width={200} height={200}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data2}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </div>
            </div>
          </div>
          <div
            style={{ marginTop: "-60px", marginBottom: "1000px" }}
            className="machines"
          >
            <h1 style={{ color: "#e67e22" }}>Les Produits</h1>
            <div style={{ height: "350px", marginBottom: "80px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={data4}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Existant" fill="#8884d8" />
                  <Bar dataKey="Goal" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
              <TableContainer
                component={Paper}
                style={{ marginTop: "60px", marginBottom: "100px" }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ backgroundColor: "#8884d8", color: "#fff" }}
                      >
                        Nom
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#8884d8", color: "#fff" }}
                        align="right"
                      >
                        Existant
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#8884d8", color: "#fff" }}
                        align="right"
                      >
                        Goal
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#8884d8", color: "#fff" }}
                        align="right"
                      >
                        Avancement
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {produits.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.Current}</TableCell>
                        <TableCell align="right">{row.Goal}</TableCell>
                        <TableCell align="center">
                          <div
                            style={{
                              width: "100px",
                              height: "15px",
                              borderRadius: "10px",
                              border: "1px solid #555",
                              marginLeft: "auto",
                            }}
                          >
                            <div
                              style={{
                                width: `${(
                                  (row.Current * 100) /
                                  row.Goal
                                ).toFixed(1)}%`,
                                height: "100%",
                                borderRadius: "10px",
                                backgroundColor: "#82ca9d",
                                display: "flex",
                                alignItems: "center",
                                // justifyContent: "center",
                              }}
                            >
                              <p style={{ marginLeft: "20px" }}>
                                {((row.Current * 100) / row.Goal).toFixed(0)} %
                              </p>
                            </div>
                          </div>{" "}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer
                component={Paper}
                style={{ marginTop: "60px", marginBottom: "100px" }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ backgroundColor: "#8884d8", color: "#fff" }}
                      >
                        Nom
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#8884d8", color: "#fff" }}
                        align="right"
                      >
                        Employés
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#8884d8", color: "#fff" }}
                        align="center"
                      >
                        Type
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#8884d8", color: "#fff" }}
                        align="center"
                      >
                        Matiére Premiére restante
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#8884d8", color: "#fff" }}
                        align="right"
                      >
                        Cas de Maintenance
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {machines.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.employees}</TableCell>
                        <TableCell align="center">
                          {row.type == 1
                            ? "Principale"
                            : row.type == 2
                            ? "Secondaire"
                            : "Supportive"}
                        </TableCell>
                        <TableCell align="center">
                          {row.name == "Brassé"
                            ? row.mat.split(",").map((e) => <p>{e}</p>)
                            : row.mat}
                        </TableCell>
                        <TableCell
                          style={{
                            backgroundColor:
                              row.maint >= 90
                                ? "#82ca9d"
                                : row.maint >= 50 && row.maint <= 80
                                ? "#f39c12"
                                : "tomato",
                            color: "#fff",
                          }}
                          align="center"
                        >
                          {row.maint} %
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
