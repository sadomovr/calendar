import { ChangeEvent } from "react";
import { Input } from "../../../../app/ui/input";
import { Task } from "../../../../app/types/task.ts";
import { Label } from "../../../../app/types/labels.ts";
import { Button } from "../../../../app/ui/Button";
import styled from "styled-components";

const ImportContainer = styled.div`
	display: flex;
	gap: 10px;
	flex-direction: column;
	
	& span {
		font-weight: bold;
	}
`

type ImportButtonProps = {
	handleImportData: ( tasks: { [key: string]: Task[] }, labels: Label[] ) => void
}

export const ImportButton = ( { handleImportData }: ImportButtonProps ) => {

	const handleImport = (event: ChangeEvent<HTMLInputElement> ) => {
		const file = event.target.files?.[0]

		if (file) {
			const reader = new FileReader()

			reader.onload = (e) => {
				try {
					const jsonData = JSON.parse(e.target?.result as string);

					if( !jsonData.tasks || !jsonData.labels ) {
						return
					}

					handleImportData( jsonData.tasks, jsonData.labels )
				} catch (error) {
					console.error("Error parsing JSON file: ", error);
				}
			};

			reader.readAsText(file);
		}
	};

	return (
		<ImportContainer>
			<span>
				Import data
			</span>
			<Input type="file" onChange={handleImport} />
			<Button> Save </Button>
		</ImportContainer>
	)
}
