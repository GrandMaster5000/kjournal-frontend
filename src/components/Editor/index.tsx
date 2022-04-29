import EditorJS from '@editorjs/editorjs';
import { useEffect } from 'react';
import styles from './Editor.module.scss'

const Editor = () => {
	useEffect(() => {
		const editor = new EditorJS({
			holder: 'editor',
			placeholder: 'Введите текст вашей статьи',
			autofocus: true
		});

		return () => {
			editor.isReady.then(() => {
				editor.destroy();
			})
			.catch(e => console.error('ERROR editor cleanup', e))
		}
	}, []);

	return (
		<div className={styles.editor}>
			<div tabIndex={1} id='editor' />
		</div>
	)
}

export default Editor;