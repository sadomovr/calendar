import { ImportButton } from "./ImportButton.tsx";
import { ExportButton } from "./ExportButton.tsx";
import styled from "styled-components";
import { ExportImgButton } from "./ExportImgButton.tsx";
import { useDaysContext } from "../../providers/DaysProvider.tsx";

const ImportExportContainer = styled.div`
	display: flex;
	gap: 15px;
	align-items: flex-start;
`

type ExportImgButtonProps = {
	handleDownload: () => void
}

export const ImportExportController = (
	{ handleDownload }: ExportImgButtonProps
) => {
	const { handleImportData } = useDaysContext()

	return (
		<ImportExportContainer>
			<ImportButton handleImportData={handleImportData}/>
			<ExportButton />
			<ExportImgButton handleDownload={handleDownload} />
		</ImportExportContainer>
	)
}
