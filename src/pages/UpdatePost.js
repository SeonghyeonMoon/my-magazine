import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { writePostDB } from '../store/modules/post';
import { useNavigate } from 'react-router-dom';
import AWS from 'aws-sdk';

const UpdatePost = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		content: '',
		type: 1,
		img_url: '',
	});

	const [progress, setProgress] = useState(0);
	const [imageSrc, setImageSrc] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);

	const S3_BUCKET = 'my-magazine-shine7329';
	const ACCESS_KEY = process.env.REACT_APP_AWSAccessKeyId;
	const SECRET_ACCESS_KEY = process.env.REACT_APP_AWSSecretKey;
	const REGION = 'ap-northeast-2';

	AWS.config.update({
		accessKeyId: ACCESS_KEY,
		secretAccessKey: SECRET_ACCESS_KEY,
	});

	const myBucket = new AWS.S3({
		params: { Bucket: S3_BUCKET },
		region: REGION,
	});

	const handleFileInput = e => {
		const file = e.target.files[0];
		if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
			if (file.size > 3000000) {
				alert('3mb 이하 이미지만 업로드 가능합니다.');
			}
			alert('png, jpg 파일만 Upload 가능합니다.');
			return;
		}
		setProgress(0);
		setSelectedFile(file);
		encodeFileToBase64(file);
	};

	const encodeFileToBase64 = fileBlob => {
		const reader = new FileReader();
		reader.readAsDataURL(fileBlob);
		return new Promise(resolve => {
			reader.onload = () => {
				setImageSrc(reader.result);
				resolve();
			};
		});
	};

	const uploadFile = file => {
		const params = {
			ACL: 'public-read',
			Body: file,
			Bucket: S3_BUCKET,
			Key: 'upload/' + file.name,
		};
		myBucket
			.putObject(params)
			.on('httpUploadProgress', (evt, res) => {
				setProgress(Math.round((evt.loaded / evt.total) * 100));
				setInputs({
					...inputs,
					img_url:
						'https://my-magazine-shine7329.s3.ap-northeast-2.amazonaws.com' +
						res.request.httpRequest.path,
				});
			})
			.send(err => {
				if (err) console.log(err);
			});
	};

	const onChange = e => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	const uploadPost = () => {
		dispatch(writePostDB(inputs));
		navigate('/');
	};

	return (
		<div>
			<h1>Update</h1>
			<select name='type' onChange={onChange}>
				<option value={1}>Bottom</option>
				<option value={2}>Left</option>
				<option value={3}>Right</option>
			</select>
			<input type='file' onChange={handleFileInput} />
			{progress ? `${progress}% 완료` : '업로드 해주세요'}
			<button
				onClick={() => {
					uploadFile(selectedFile);
				}}
			>
				서버에 업로드
			</button>
			{imageSrc && <img src={imageSrc} alt='preview' />}
			<input type='text' name='content' label='내용' onChange={onChange} />
			<button onClick={uploadPost}>Upload</button>
		</div>
	);
};

export default UpdatePost;
