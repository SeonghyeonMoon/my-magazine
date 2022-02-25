import axios from 'axios';
import { useState } from 'react';
import AWS from 'aws-sdk';
import Button from '../elements/Button';
import Input from '../elements/Input';
import styled from 'styled-components';

const WritePost = () => {
	const [progress, setProgress] = useState(0);
	const [imageSrc, setImageSrc] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [img_url, setUrl] = useState('');
	const [contents, setContents] = useState('');

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
				setUrl(
					'https://my-magazine-shine7329.s3.ap-northeast-2.amazonaws.com' +
						res.request.httpRequest.path
				);
			})
			.send(err => {
				if (err) console.log(err);
			});
	};

	const onChange = e => {
		setContents(e.target.value);
	};

	const uploadPost = () => {
		const token = localStorage.getItem('token');
		axios
			.post(
				'http://xpecter.shop/api/post',
				{ contents, img_url },
				{
					headers: { token },
				}
			)
			.then(res => {
				console.log(res);
			});
	};

	return (
		<Container>
			<PageTitle>Write</PageTitle>
			<input type='file' onChange={handleFileInput} />
			{progress ? `${progress}% 완료` : '업로드 해주세요'}
			<button
				onClick={() => {
					uploadFile(selectedFile);
				}}
			>
				서버에 업로드
			</button>
			{imageSrc && <Preview src={imageSrc} alt='preview' />}
			<Input type='text' name='contents' label='내용' _onChange={onChange} />
			<Button _onClick={uploadPost}>Upload</Button>
		</Container>
	);
};

export default WritePost;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: calc(80vh - 60px);
	input,
	button {
		margin-bottom: 50px;
	}
`;

const PageTitle = styled.h2`
	color: #999;
	font-size: 50px;
`;

const Preview = styled.img`
	width: 500px;
	height: 500px;
`;
