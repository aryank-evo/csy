"use client";

import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiInstance from '@/utils/apiInstance';
import Image from 'next/image';

// Function to update CMS page with file uploads
const updateCmsPageWithFiles = async (slug: string, formData: FormData) => {
    const response = await apiInstance.post(`/cms/${slug}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

const AboutUsPageEditor = () => {
    const queryClient = useQueryClient();

    const { data: aboutUsPage, isLoading } = useQuery({
        queryKey: ['about-us'],
        queryFn: async () => {
            const response = await apiInstance.get('/cms/about-us');
            return response.data.data || [];
        }
    });

    const [primaryImage, setPrimaryImage] = useState('');
    const [directorMsg, setDirectorMsg] = useState('');
    const [directorName, setDirectorName] = useState('');

    // State for about-specific fields
    const [aboutSubtitle, setAboutSubtitle] = useState('');
    const [aboutDesc1, setAboutDesc1] = useState('');
    const [aboutTitle1, setAboutTitle1] = useState('');
    const [aboutTitle2, setAboutTitle2] = useState('');
    const [aboutDesc2, setAboutDesc2] = useState('');
    const [aboutDesc3, setAboutDesc3] = useState('');
    const [aboutMission, setAboutMission] = useState('');

    // State for social media links
    const [facebookLink, setFacebookLink] = useState('');
    const [instagramLink, setInstagramLink] = useState('');
    const [youtubeLink, setYoutubeLink] = useState('');

    const [primaryImageFile, setPrimaryImageFile] = useState<File | null>(null);

    const [primaryImagePreview, setPrimaryImagePreview] = useState('');

    const primaryImageInputRef = useRef<HTMLInputElement>(null);


    // Use React Query Mutation for saving
    const mutation = useMutation({
        mutationFn: async (data: { primaryImage?: string, directorMsg?: string, directorName?: string, aboutSubtitle?: string, aboutDesc1?: string, aboutTitle1?: string, aboutTitle2?: string, aboutDesc2?: string, aboutDesc3?: string, aboutMission?: string, facebookLink?: string, instagramLink?: string, youtubeLink?: string }) => {
            // Create FormData to handle file uploads
            const formData = new FormData();


            // Add new director fields
            if (data.directorMsg) {
                formData.append('directorMsg', data.directorMsg);
            }
            if (data.directorName) {
                formData.append('directorName', data.directorName);
            }

            // Add about-specific fields
            if (data.aboutSubtitle) {
                formData.append('aboutSubtitle', data.aboutSubtitle);
            }
            if (data.aboutDesc1) {
                formData.append('aboutDesc1', data.aboutDesc1);
            }
            if (data.aboutTitle1) {
                formData.append('aboutTitle1', data.aboutTitle1);
            }
            if (data.aboutTitle2) {
                formData.append('aboutTitle2', data.aboutTitle2);
            }
            if (data.aboutDesc2) {
                formData.append('aboutDesc2', data.aboutDesc2);
            }
            if (data.aboutDesc3) {
                formData.append('aboutDesc3', data.aboutDesc3);
            }
            if (data.aboutMission) {
                formData.append('aboutMission', data.aboutMission);
            }
            // Add social media link fields
            if (data.facebookLink) {
                formData.append('facebookLink', data.facebookLink);
            }
            if (data.instagramLink) {
                formData.append('instagramLink', data.instagramLink);
            }
            if (data.youtubeLink) {
                formData.append('youtubeLink', data.youtubeLink);
            }

            // Add image files if they exist
            if (primaryImageFile) {
                formData.append('primaryImage', primaryImageFile);
            }

            // Add fallback URLs if no file is selected
            if (!primaryImageFile && data.primaryImage) {
                formData.append('primaryImage', data.primaryImage);
            }

            return updateCmsPageWithFiles('about-us', formData);
        },
        onSuccess: () => {
            toast.success('Page content updated successfully');
            queryClient.invalidateQueries({ queryKey: ['cms-page', 'about-us'] });
            // Clear file states after successful upload
            setPrimaryImageFile(null);
            setPrimaryImagePreview('');

        },
        onError: (error: any) => {
            console.error('Error saving CMS content:', error);
            const message = error.response?.data?.error || 'Error saving content';
            toast.error(message);
        },
    });

    // Update local state when data is fetched
    useEffect(() => {
        if (aboutUsPage) {
            setPrimaryImage(aboutUsPage.primaryImage || '');
            setPrimaryImagePreview(aboutUsPage.primaryImage || '');
            setDirectorMsg(aboutUsPage.directorMsg || '');
            setDirectorName(aboutUsPage.directorName || '');

            // Set about-specific fields
            setAboutSubtitle(aboutUsPage.aboutSubtitle || '');
            setAboutDesc1(aboutUsPage.aboutDesc1 || '');
            setAboutTitle1(aboutUsPage.aboutTitle1 || '');
            setAboutTitle2(aboutUsPage.aboutTitle2 || '');
            setAboutDesc2(aboutUsPage.aboutDesc2 || '');
            setAboutDesc3(aboutUsPage.aboutDesc3 || '');
            setAboutMission(aboutUsPage.aboutMission || '');

            // Set social media links
            setFacebookLink(aboutUsPage.facebookLink || '');
            setInstagramLink(aboutUsPage.instagramLink || '');
            setYoutubeLink(aboutUsPage.youtubeLink || '');
        }
    }, [aboutUsPage]);

    // Handle primary image file selection
    const handlePrimaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPrimaryImageFile(file);

            // Create a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPrimaryImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Trigger file input clicks
    const triggerPrimaryImageUpload = () => {
        if (primaryImageInputRef.current) {
            primaryImageInputRef.current.click();
        }
    };

    const handleSave = () => {
        mutation.mutate({
            primaryImage,
            directorMsg,
            directorName,
            aboutSubtitle,
            aboutDesc1,
            aboutTitle1,
            aboutTitle2,
            aboutDesc2,
            aboutDesc3,
            aboutMission,
            facebookLink,
            instagramLink,
            youtubeLink
        });
    };

    if (isLoading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="cms-editor bg-white p-4 rounded-3 shadow-sm mt-3">
            <div className="mb-4">
                <label className="form-label fw-bold">Main Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={aboutTitle1}
                    onChange={(e) => setAboutTitle1(e.target.value)}
                    placeholder="Enter first title (e.g. Secure your family's Dream home.)"
                />
            </div>

            <div className="mb-4">
                <label className="form-label fw-bold">Main Description</label>
                <textarea
                    className="form-control"
                    rows={3}
                    value={aboutDesc1}
                    onChange={(e) => setAboutDesc1(e.target.value)}
                    placeholder="Enter first description"
                />
            </div>

            <div className="mb-4">
                <label className="form-label fw-bold">Sub Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={aboutTitle2}
                    onChange={(e) => setAboutTitle2(e.target.value)}
                    placeholder="Enter second title (e.g. Who we are?)"
                />
            </div>

            <div className="mb-4">
                <label className="form-label fw-bold">Sub Description</label>
                <textarea
                    className="form-control"
                    rows={3}
                    value={aboutDesc2}
                    onChange={(e) => setAboutDesc2(e.target.value)}
                    placeholder="Enter second description"
                />
            </div>

            <div className="mb-4">
                <label className="form-label fw-bold">Mission Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={aboutMission}
                    onChange={(e) => setAboutMission(e.target.value)}
                    placeholder="Enter mission title (e.g. Our Mission)"
                />
            </div>

            <div className="mb-4">
                <label className="form-label fw-bold">Mission Description</label>
                <textarea
                    className="form-control"
                    rows={3}
                    value={aboutDesc3}
                    onChange={(e) => setAboutDesc3(e.target.value)}
                    placeholder="Enter mission description"
                />
            </div>

            <div className="mb-4">
                <label className="form-label fw-bold">Primary Image</label>
                <div
                    className="border border-2 border-dashed rounded p-4 text-center cursor-pointer bg-light mt-2"
                    style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={triggerPrimaryImageUpload}
                >
                    {primaryImagePreview ? (
                        <Image
                            src={primaryImagePreview}
                            alt="Primary Preview"
                            className="img-fluid rounded"
                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div>
                            <i className="bi bi-cloud-upload fs-1 text-muted"></i>
                            <p className="mb-0 mt-2">Click to upload</p>
                            <small className="text-muted">or drag and drop</small>
                        </div>
                    )}
                </div>
                <input
                    type="file"
                    ref={primaryImageInputRef}
                    onChange={handlePrimaryImageChange}
                    className="d-none"
                    accept="image/*"
                />
                {primaryImagePreview && (
                    <div className="mt-2">
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => {
                                setPrimaryImageFile(null);
                                setPrimaryImagePreview('');
                                if (primaryImageInputRef.current) {
                                    primaryImageInputRef.current.value = '';
                                }
                            }}
                        >
                            Remove
                        </button>
                    </div>
                )}
            </div>
            <div className="mt-4 p-4 bg-light rounded-3 border">
                <h5 className="mb-3">Social Media Links</h5>
                <p className="text-muted small mb-4">Add your social media profile links. Leave empty to hide the icon.</p>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">
                            <i className="bi bi-facebook text-primary me-2"></i>Facebook
                        </label>
                        <input
                            type="url"
                            className="form-control"
                            value={facebookLink}
                            onChange={(e) => setFacebookLink(e.target.value)}
                            placeholder="https://facebook.com/yourpage"
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">
                            <i className="bi bi-instagram text-danger me-2"></i>Instagram
                        </label>
                        <input
                            type="url"
                            className="form-control"
                            value={instagramLink}
                            onChange={(e) => setInstagramLink(e.target.value)}
                            placeholder="https://instagram.com/yourpage"
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">
                            <i className="bi bi-youtube text-danger me-2"></i>YouTube
                        </label>
                        <input
                            type="url"
                            className="form-control"
                            value={youtubeLink}
                            onChange={(e) => setYoutubeLink(e.target.value)}
                            placeholder="https://youtube.com/yourchannel"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-5 border-top pt-3">
                <button
                    className="btn btn-primary px-4 py-2"
                    onClick={handleSave}
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Saving...
                        </>
                    ) : 'Update Page Content'}
                </button>
            </div>
        </div>
    );
};

export default AboutUsPageEditor;