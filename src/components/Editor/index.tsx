import EditorJS, { OutputBlockData } from '@editorjs/editorjs';
import { useEffect } from 'react';
import styles from './Editor.module.scss';

interface EditorProps {
	onChange: (blocks: OutputBlockData[]) => void;
	initialBlocks: OutputBlockData[];
}

const Editor = ({ onChange, initialBlocks }: EditorProps) => {
	useEffect(() => {
		const editor = new EditorJS({
			holder: 'editor',
			data: {
				blocks: initialBlocks,
			},
			placeholder: 'Введите текст вашей статьи',
			autofocus: true,
			async onChange() {
				const { blocks } = await editor.save();
				onChange(blocks);
			},
		});

		return () => {
			editor.isReady
				.then(() => {
					editor.destroy();
				})
				.catch((e) => console.error('ERROR editor cleanup', e));
		};
	}, []);

	return (
		<div className={styles.editor}>
			<div tabIndex={1} id="editor" />
		</div>
	);
};

export default Editor;
