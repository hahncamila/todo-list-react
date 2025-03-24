import "./index.css";

const Header = () => {
	return (
		<div className="header">
			<p>Organização</p>
			<p
				style={{
					color: "#535bf2",
					backgroundColor: "white",
					padding: "5px 20px",
					borderRadius: "10px 10px 0 0",
				}}>
				Tarefas
			</p>
		</div>
	);
};

export default Header;
