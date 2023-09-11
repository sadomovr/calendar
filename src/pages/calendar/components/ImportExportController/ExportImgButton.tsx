import { Button } from "../../../../app/ui/Button";

type ExportImgButtonProps = {
	handleDownload: () => void
}
export const ExportImgButton = ( { handleDownload }: ExportImgButtonProps ) => {
	return (
		<Button onClick={handleDownload}>
			Download as image
		</Button>
	)
}
