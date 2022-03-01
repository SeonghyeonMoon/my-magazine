import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { writePostDB } from '../store/modules/post';
import { useNavigate } from 'react-router-dom';
import AWS from 'aws-sdk';
import styled from 'styled-components';

const WritePost = () => {
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
		if (
			!(
				file.type === 'image/jpeg' ||
				file.type === 'image/png' ||
				file.type === 'image/heif'
			)
		) {
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
		<Container>
			<PageTitle>Write</PageTitle>
			<Select name='type' onChange={onChange}>
				<option value={1}>Bottom</option>
				<option value={2}>Left</option>
				<option value={3}>Right</option>
			</Select>
			<FileInput type='file' id='file' onChange={handleFileInput} />
			<FileLabel for='file'>파일 선택</FileLabel>
			{progress
				? `${progress}% 완료`
				: '파일 선택 후 서버에 업로드를 눌러주세요'}
			<Button
				onClick={() => {
					uploadFile(selectedFile);
				}}
			>
				서버에 업로드
			</Button>
			{imageSrc && <Preview src={imageSrc} alt='preview' />}
			<Input
				type='text'
				name='content'
				placeholder='내용을 입력하세요'
				onChange={onChange}
			/>
			<Button onClick={uploadPost}>Upload</Button>
		</Container>
	);
};

export default WritePost;

const Container = styled.div`
	padding: 50px 0;
	width: 500px;
	height: auto;
	background-color: #fff;
	margin: 100px auto;
	border: 1px solid #ccc;
	border-radius: 10px;
	display: flex;
	align-items: center;
	flex-direction: column;
	box-shadow: 10px 10px 10px #ccc;
	* {
		margin-bottom: 50px;
	}
`;

const PageTitle = styled.h2`
	font-size: 30px;
	text-align: center;
	color: #777;
`;

const Select = styled.select`
	width: 80%;
	height: 50px;
	border: 2px solid #ccc;
	border-radius: 3px;
	outline: none;
	text-align: center;
	font-size: 15px;
	color: #555;
`;

const Preview = styled.img`
	width: 80%;
`;

const Input = styled.input`
	display: block;
	border: 2px solid #ccc;
	border-radius: 3px;
	width: 80%;
	height: 50px;
	text-align: center;
	background-color: #eee;
	outline: none;
	font-size: 15px;
	color: #444;
`;

const FileInput = styled.input`
	position: absolute;
	width: 0;
	height: 0;
	padding: 0;
	overflow: hidden;
	border: 0;
`;

const FileLabel = styled.label`
	background-color: #777;
	color: #fff;
	width: 80%;
	height: 50px;
	border-radius: 5px;
	text-align: center;
	line-height: 50px;
	cursor: pointer;
	box-shadow: 5px 5px 5px #ccc;
	&:hover {
		background-color: #aaa;
	}
	&:active {
		background-color: #555;
	}
`;

const Button = styled.button`
	width: 80%;
	height: 50px;
	color: #fff;
	border: none;
	background-color: #777;
	border-radius: 5px;
	font-size: 15px;
	box-shadow: 5px 5px 5px #ccc;
	transition: 0.1s;
	cursor: pointer;
	&:hover {
		background-color: #aaa;
	}
	&:active {
		background-color: #555;
	}
`;
