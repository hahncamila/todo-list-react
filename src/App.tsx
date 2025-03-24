import { useState } from "react";
import "./App.css";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import Header from "./Header";

interface ToDoItem {
	id: string;
	texto: string;
	completado: boolean;
}

function App() {
	const [toDos, setToDos] = useState<ToDoItem[]>([]);
	const [newToDo, setNewToDo] = useState<string>("");
	const [openDialog, setOpenDialog] = useState(false);
	const [actionType, setActionType] = useState<"edit" | "delete" | null>(null);
	const [selectedToDoId, setSelectedToDoId] = useState<string | null>(null);
	const [editId, setEditId] = useState<string | null>(null);
	const [editText, setEditText] = useState<string>("");

	const adicionarTarefa = () => {
		if (newToDo !== "") {
			const newId = crypto.randomUUID();
			const newToDoItem: ToDoItem = {
				id: newId,
				texto: newToDo,
				completado: false,
			};
			setToDos([...toDos, newToDoItem]);
			setNewToDo("");
		}
	};

	const marcarCompleto = (id: string) => {
		const todosAtualizados = toDos.map((toDo) => {
			if (toDo.id === id) {
				return { ...toDo, completado: !toDo.completado };
			}
			return toDo;
		});
		setToDos(todosAtualizados);
	};

	const iniciarEdicao = (toDo: ToDoItem) => {
		setEditId(toDo.id);
		setEditText(toDo.texto);
	};

	const editarTarefa = () => {
		if (editId && editText !== "") {
			const todosAtualizados = toDos.map((toDo) => {
				if (toDo.id === editId) {
					return { ...toDo, texto: editText };
				}
				return toDo;
			});
			setToDos(todosAtualizados);
			setEditId(null);
			setEditText("");
		}
	};

	const excluirTarefa = (id: string) => {
		setToDos(toDos.filter((toDo) => toDo.id !== id));
	};

	const handleOpenDialog = (action: "edit" | "delete", id: string) => {
		setActionType(action);
		setSelectedToDoId(id);
		setOpenDialog(true);
	};

	const handleConfirm = () => {
		if (actionType === "delete" && selectedToDoId) {
			excluirTarefa(selectedToDoId);
		} else if (actionType === "edit" && selectedToDoId) {
			const toDo = toDos.find((t) => t.id === selectedToDoId);
			if (toDo) {
				iniciarEdicao(toDo);
			}
		}
		setOpenDialog(false);
	};

	return (
		<>
			<Header />
			<div>
				<div className="container">
					<h1 className="title">
						Otimize seu tempo e se organize com o nosso Planejador Diário.
					</h1>
					<table>
						<thead>
							<tr>
								<th
									style={{
										width: "280px",
										textAlign: "left",
									}}>
									Tarefa
								</th>
								<th>Status</th>
								<th>Opções</th>
							</tr>
						</thead>
						<tbody>
							{toDos.map((toDo) => (
								<tr key={toDo.id}>
									<td
										style={{
											width: "280px",
											textAlign: "left",
											overflow: "hidden",
										}}>
										<span
											style={{
												textDecoration: toDo.completado
													? "line-through"
													: "none",
											}}>
											{editId === toDo.id ? (
												<input
													type="text"
													value={editText}
													onChange={(e) => setEditText(e.target.value)}
												/>
											) : (
												toDo.texto
											)}
										</span>
									</td>
									<td>
										<input
											type="checkbox"
											checked={toDo.completado}
											onChange={() => marcarCompleto(toDo.id)}
										/>
									</td>
									<td>
										{editId === toDo.id ? (
											<button onClick={editarTarefa}>
												<span className="material-symbols-outlined">check</span>
											</button>
										) : (
											<button onClick={() => handleOpenDialog("edit", toDo.id)}>
												<span className="material-symbols-outlined">edit</span>
											</button>
										)}
										<button onClick={() => handleOpenDialog("delete", toDo.id)}>
											<span className="material-symbols-outlined">delete</span>
										</button>
									</td>
								</tr>
							))}
							<div className="input-container">
								<input
									className="input-task"
									type="text"
									placeholder="Nova tarefa..."
									value={newToDo}
									onChange={(e) => setNewToDo(e.target.value)}
								/>
								<button onClick={adicionarTarefa}>
									<span className="material-symbols-outlined">add</span>
								</button>
							</div>
						</tbody>
					</table>
				</div>
			</div>
			<Dialog
				open={openDialog}
				onClose={() => setOpenDialog(false)}
				sx={{ fontFamily: "Poppins" }}>
				<DialogTitle
					style={{
						fontWeight: 600,
						fontSize: "30px",
						textAlign: "center",
						justifyContent: "center",
						padding: "70px 70px 0px 70px",
					}}>
					{" "}
					{actionType === "delete"
						? "Deseja excluir esse item?"
						: "Deseja editar esse item?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ textAlign: "center" }}>
						<div style={{ textAlign: "center", fontSize: "20px" }}>
							{toDos.find((toDo) => toDo.id === selectedToDoId)?.texto}
						</div>
					</DialogContentText>
				</DialogContent>
				<DialogActions
					sx={{ justifyContent: "center", padding: "20px 70px 70px 70px" }}>
					<Button
						onClick={() => setOpenDialog(false)}
						sx={{
							background: " #535bf2",
							padding: "8px 60px",
							color: "white",
							fontSize: "15px",
						}}>
						Não
					</Button>
					<Button
						onClick={handleConfirm}
						sx={{
							padding: "8px 60px",
							color: "black",
							fontSize: "15px",
							border: "1px solid black",
						}}>
						Sim
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default App;
